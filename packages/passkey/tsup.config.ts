import { defineConfig } from "tsup";

export default defineConfig({
	entry: ["src/index.ts"],
	splitting: true,
	sourcemap: true,
	clean: true,
	platform: "browser",
	target: "es2022",
	format: "esm",
	dts: true,
});
