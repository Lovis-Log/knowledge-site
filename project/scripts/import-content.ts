import { spawnSync } from "node:child_process";
import { exportContent } from "./export-content";
const remote = process.argv.includes("--remote");
const environment = process.argv
  .find((arg) => arg.startsWith("--env="))
  ?.split("=")[1];
if (remote && !["preview", "production"].includes(environment ?? ""))
  throw new Error("Remote imports require --env=preview or --env=production");
await exportContent();
for (const file of [
  ".backend-build/content.sql",
  ...(process.argv.includes("--stage") ? [] : [".backend-build/activate.sql"]),
]) {
  const args = [
    "node_modules/wrangler/bin/wrangler.js",
    "d1",
    "execute",
    "DB",
    remote ? "--remote" : "--local",
    "--file",
    file,
  ];
  if (remote) args.push("--env", environment!);
  const result = spawnSync(process.execPath, args, {
    encoding: "utf8",
    maxBuffer: 16 * 1024 * 1024,
  });
  if (result.status !== 0) {
    console.error(
      result.stderr || "D1 import failed; active content was not switched.",
    );
    process.exit(result.status ?? 1);
  }
  console.log(
    file.endsWith("activate.sql")
      ? "Content version activated."
      : "Content entries imported successfully.",
  );
}
