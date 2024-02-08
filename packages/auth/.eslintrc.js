/** @type {import("eslint").Linter.Config} */
module.exports = {
	root: true,
	extends: ["@0x57/eslint-config/library.js"],
	parser: "@typescript-eslint/parser",
	parserOptions: {
		project: true,
	},
	overrides: [
		{
			files: ["./src/web.ts", "./src/web/**/*.ts"],
			extends: ["@0x57/eslint-config/next.js"],
		},
	],
};
