import { build } from "esbuild";
import { writeFile } from "node:fs/promises";
await build({
  entryPoints: ["backend/index.ts"],
  outfile: "out/_worker.js",
  bundle: true,
  format: "esm",
  platform: "neutral",
  target: "es2022",
  external: ["node:*"],
  minify: true,
});
// Every request enters the Worker; attachments must never bypass access checks.
await writeFile(
  "out/_routes.json",
  JSON.stringify({ version: 1, include: ["/*"], exclude: [] }),
);
await writeFile(
  "out/_headers",
  "/_next/static/*\n  X-Content-Type-Options: nosniff\n",
);
console.log("Pages Worker built; all routes pass through authentication.");
