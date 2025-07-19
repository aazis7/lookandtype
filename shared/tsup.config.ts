import { defineConfig } from "tsup";

const isProduction = process.env.NODE_ENV === "production";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs", "esm"],
  outDir: "dist",
  sourcemap: true,
  tsconfig: "./tsconfig.json",
  dts: true,
  minify: isProduction,
  clean: true,
  target: "node22",
});
