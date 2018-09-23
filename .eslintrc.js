module.exports = {
	"env": {
		"browser": true,
		"node": true,
		"es6": true
	},
	"extends": [
		"eslint:recommended",
		"plugin:vue/essential",
		"plugin:vue/strongly-recommended"
	],
	"parserOptions": {
		"ecmaVersion": 2018,
		"sourceType": "module"
	},
	"rules": {
		"indent": [
			"error",
			"tab"
		],
		"linebreak-style": [
			"error",
			"unix"
		],
		"quotes": [
			"error",
			"single"
		],
		"semi": [
			"error",
			"never"
		],
		"vue/no-unused-components": [
			"off"
		],
		"vue/name-property-casing": [
			"off"
		],
		"vue/max-attributes-per-line": [
			"off"
		],
		"vue/require-prop-types": [
			"off"
		],
		"vue/mustache-interpolation-spacing": [0, 'always'],
		"vue/html-indent": ["error", 'tab', {
			"attribute": 1,
			"closeBracket": 0,
			"alignAttributesVertically": false,
			"ignores": []
		}]
	}
};