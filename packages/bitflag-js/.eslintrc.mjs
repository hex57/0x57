/** @type {import("eslint").Linter.Config} */
module.exports = {
	root: true,
	extends: ["@0x57/eslint-config/library.js"],
	parserOptions: {
		project: true,
	},
};
