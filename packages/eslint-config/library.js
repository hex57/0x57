const { resolve } = require("node:path");

const project = resolve(process.cwd(), "tsconfig.json");

/** @type {import("eslint").Linter.Config} */
module.exports = {
	parser: "@typescript-eslint/parser",
	plugins: ["@typescript-eslint", "eslint-plugin-tsdoc"],
	extends: ["xo", "xo-typescript", "eslint-config-turbo", "prettier"],
	globals: {
		React: true,
		JSX: true,
	},
	env: {
		node: true,
		es2020: true,
	},
	settings: {
		"import/resolver": {
			typescript: {
				project,
			},
		},
	},
	ignorePatterns: [
		// Ignore dotfiles
		".*.js",
		"node_modules/",
		"dist/",
	],
	overrides: [
		{
			files: ["*.js?(x)", "*.ts?(x)"],
		},
	],
	rules: {
		"accessor-pairs": 0,
		"capitalized-comments": 0,
		"no-bitwise": 0,
		"no-eq-null": 0,
		"object-shorthand": ["error", "properties"],
		"eqeqeq": ["error", "smart"],
		"no-await-in-loop": 0,
		"max-params": 0,
		"complexity": 0,
		"tsdoc/syntax": "error",
		"@typescript-eslint/consistent-type-definitions": 0,
		"@typescript-eslint/naming-convention": 0,
		"@typescript-eslint/parameter-properties": 0,
		"@typescript-eslint/prefer-reduce-type-parameter": "error",
		"@typescript-eslint/no-import-type-side-effects": "error",
	},
};
