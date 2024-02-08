/** @type {import("eslint").Linter.Config} */
module.exports = {
	root: true,
	extends: ["@0x57/eslint-config/next.js"],
	parser: "@typescript-eslint/parser",
	parserOptions: {
		project: true,
	},
};
