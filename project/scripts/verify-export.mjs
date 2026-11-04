// Compatibility entry point: authenticated content must not appear in static exports.
import {spawnSync} from "node:child_process";
const result=spawnSync(process.execPath,["node_modules/tsx/dist/cli.mjs","scripts/verify-protected-export.ts"],{stdio:"inherit"});
process.exitCode=result.status??1;
