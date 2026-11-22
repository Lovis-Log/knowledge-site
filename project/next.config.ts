import type { NextConfig } from "next";
import { PHASE_PRODUCTION_BUILD } from "next/constants";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default function config(phase: string): NextConfig {
  return phase === PHASE_PRODUCTION_BUILD
    ? { ...nextConfig, typescript: { tsconfigPath: "tsconfig.build.json" } }
    : nextConfig;
}
