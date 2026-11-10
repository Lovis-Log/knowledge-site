import { execFileSync } from "node:child_process";
import { mkdir, open, readFile, writeFile, unlink } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

process.chdir(resolve(dirname(fileURLToPath(import.meta.url)), ".."));
const args = process.argv.slice(2);
if (args.some((arg) => !["--check", "--resume"].includes(arg)))
  throw new Error("Usage: npm run release [-- --check|--resume]");
const checkOnly = args.includes("--check");
const resume = args.includes("--resume");
if (checkOnly && resume) throw new Error("Choose --check or --resume");
const base = "https://lovismind.pages.dev";
const wrangler = "node_modules/wrangler/bin/wrangler.js";
const git = (...args: string[]) => execFileSync("git", args, { encoding: "utf8" }).trim();
function run(file: string, args: string[], capture = false) {
  return execFileSync(file, args, { encoding: "utf8", stdio: capture ? "pipe" : "inherit" });
}
function npm(script: string) {
  if (!process.env.npm_execpath) throw new Error("Run through npm run release");
  run(process.execPath, [process.env.npm_execpath, "run", script]);
}
function d1(...args: string[]) {
  return run(process.execPath, [wrangler, "d1", ...args, "--remote", "--env", "production"]);
}
await mkdir(".backend-build/releases", { recursive: true });
const lockPath = ".backend-build/release.lock";
const lock = await open(lockPath, "wx");
let record: Record<string, unknown> = { startedAt: new Date().toISOString(), status: "checking" };
let recordPath = "";
async function save(status: string) {
  record = { ...record, status, updatedAt: new Date().toISOString() };
  if (recordPath) await writeFile(recordPath, JSON.stringify(record, null, 2));
}
try {
  if (!checkOnly) {
    if (git("status", "--porcelain")) throw new Error("Commit task files first; release requires a clean working tree.");
    if (process.env.KNOWLEDGE_SITE_DIR) throw new Error("Production release uses the committed Knowledge Site directory; unset KNOWLEDGE_SITE_DIR.");
    if (!/^https:\/\/github\.com\/Lovis-Log\/knowledge-site(?:\.git)?$/.test(git("remote", "get-url", "origin")))
      throw new Error("Unexpected origin; refusing production release.");
    git("fetch", "origin");
    if (resume) {
      if (git("rev-parse", "HEAD") !== git("rev-parse", "origin/main"))
        throw new Error("Resume requires HEAD to match origin/main; do not rebuild a different commit.");
    } else {
      git("merge", "--no-edit", "origin/main");
    }
  }
  // Build only after merging: HTML, Worker and D1 payload must share the same source.
  for (const script of ["updates:prepare", "types:backend", "build", "typecheck", "typecheck:backend", "verify", "verify:content", "test:auth", "test:release"])
    npm(script);
  if (checkOnly) {
    console.log("Release checks passed; no Git push or remote database write performed.");
  } else {
    const commit = git("rev-parse", "HEAD");
    const manifest = JSON.parse(await readFile(".backend-build/content-manifest.json", "utf8"));
    recordPath = `.backend-build/releases/${commit}.json`;
    record = { ...record, commit, contentVersion: manifest.version, entries: manifest.entries };
    await save("preparing-content");
    // Check Pages read access before importing or pushing anything.
    run(process.execPath, [wrangler, "pages", "deployment", "list", "--project-name", "lovismind", "--environment", "production", "--json"], true);
    // No migrations, account initialization, or secret changes are hidden in a routine release.
    function contentCounts() {
      const output = run(process.execPath, [wrangler, "d1", "execute", "DB", "--remote", "--env", "production", "--json", "--command",
        `SELECT count(*) AS total,sum(json_valid(json)) AS valid FROM content_entries WHERE version_id='${manifest.version}'`], true);
      const rows = JSON.parse(output) as { results: { total: number; valid: number }[] }[];
      return rows.flatMap((row) => row.results)[0];
    }
    let counts = contentCounts();
    if (counts?.total !== manifest.entries || counts.valid !== manifest.entries) {
      d1("execute", "DB", "--file", ".backend-build/content.sql");
      counts = contentCounts();
    } else console.log("Matching content is already complete; skipping database import.");
    if (counts?.total !== manifest.entries || counts.valid !== manifest.entries)
      throw new Error("Staged content is incomplete; no push performed.");
    if (git("status", "--porcelain") || git("rev-parse", "HEAD") !== commit)
      throw new Error("Sources changed during release; commit and start again.");
    await save("content-staged");
    if (!resume) git("push", "origin", "HEAD:main");
    await save("waiting-for-deployment");
    const deadline = Date.now() + 20 * 60_000;
    let deployed = false;
    while (Date.now() < deadline) {
      const deployments = JSON.parse(run(process.execPath, [wrangler, "pages", "deployment", "list", "--project-name", "lovismind", "--environment", "production", "--json"], true)) as { Id: string; Status: string; Source: string; Deployment: string }[];
      // Wrangler's table uses a short commit in Source; the health check below requires the full SHA.
      const deployment = deployments.find((d) => d.Source && commit.startsWith(d.Source));
      if (deployment) {
        record.deploymentId = deployment.Id;
        record.deploymentUrl = deployment.Deployment;
        if (/fail|cancel|skip/i.test(deployment.Status)) throw new Error(`Pages deployment ${deployment.Status}`);
      }
      try {
        const response = await fetch(`${base}/api/release?commit=${commit}`, { cache: "no-store", signal: AbortSignal.timeout(15_000) });
        const health = await response.json() as { commit?: string; contentVersion?: string; ready?: boolean };
        if (response.ok && health.commit === commit && health.contentVersion === manifest.version && health.ready) {
          deployed = true;
          break;
        }
      } catch { /* A deployment switch or temporary network failure can be polled again. */ }
      console.log("Waiting for the production build and matching content…");
      await new Promise((r) => setTimeout(r, 10_000));
    }
    if (!deployed) throw new Error("Production confirmation timed out; inspect Pages, then use --resume with the same commit.");
    git("fetch", "origin");
    if (git("rev-parse", "origin/main") !== commit)
      throw new Error("Another release updated main; refusing to activate a stale content pointer.");
    // This pointer remains for historical deployments; new Workers read their own pinned version.
    d1("execute", "DB", "--file", ".backend-build/activate.sql");
    for (const path of ["/", "/login/", "/register/"]) {
      const response = await fetch(base + path, { signal: AbortSignal.timeout(15_000) });
      if (!response.ok) throw new Error(`Production smoke check failed: ${path}`);
    }
    const protectedPage = await fetch(base + "/library/", { headers: { Accept: "text/html" }, redirect: "manual", signal: AbortSignal.timeout(15_000) });
    if (protectedPage.status !== 303 || !protectedPage.headers.get("location")?.startsWith("/login/"))
      throw new Error("Anonymous library access did not redirect to login.");
    await save("success");
    console.log(`Production release verified: ${commit}; content ${manifest.version}; record ${recordPath}`);
  }
} catch (error) {
  record.error = error instanceof Error ? error.message : "Release failed";
  await save("failed");
  throw error;
} finally {
  await lock.close();
  await unlink(lockPath);
}
