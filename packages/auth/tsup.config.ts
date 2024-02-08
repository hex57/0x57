import { defineConfig } from "tsup";

export default defineConfig({
	splitting: false,
	sourcemap: true,
	clean: true,
	entry: {
		server: "src/server.ts",
		web: "src/web.ts",
	},
	outDir: "dist",
	dts: true,
});
