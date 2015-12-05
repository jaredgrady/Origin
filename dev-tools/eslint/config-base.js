'use strict';

const os = require('os');

module.exports = {
	"env": {
		"node": true,
		"es6": true
	},
	"globals": {
		"Config": false, "Monitor": false, "toId": false, "Tools": false, "LoginServer": false,
		"Users": false, "Rooms": false, "Verifier": false, "CommandParser": false, "Simulator": false,
		"Tournaments": false, "Dnsbl": false, "Cidr": false, "Sockets": false, "TeamValidator": false, "Ladders": false,
		"Database": false, "Seen": false, "Tells": false
	},
	"rules": {
		"comma-dangle": [2, "never"],
		"no-cond-assign": [2, "except-parens"],
		"no-console": 0,
		"no-constant-condition": 0,
		"no-control-regex": 0,
		"no-debugger": 2,
		"no-dupe-args": 2,
		"no-dupe-keys": 2,
		"no-duplicate-case": 2,
		"no-empty-character-class": 2,
		"no-empty": 0,
		"no-ex-assign": 2,
		"disallow-extra-boolean-casts": 0,
		"no-extra-parens": 0,
		"no-extra-semi": 2,
		"no-func-assign": 2,
		"no-inner-declarations": 2,
		"no-invalid-regexp": 2,
		"no-irregular-whitespace": 2,
		"no-negated-in-lhs": 2,
		"no-obj-calls": 2,
		"no-regex-spaces": 2,
		"no-sparse-arrays": 2,
		"no-unexpected-multiline": 2,
		"no-unreachable": 2,
		"use-isnan": 2,
		"valid-jsdoc": 0,
		"valid-typeof": 2,

		"block-scoped-var": 2,
		"complexity": 0,
		"consistent-return": 0,
		"curly": [2, "multi-line", "consistent"],
		"default-case": 0,
		"dot-location": [2, "property"],
		"dot-notation": 0,
		"eqeqeq": 2,
		"no-caller": 2,
		"no-case-declarations": 0,
		"no-div-regex": 2,
		"no-else-return": 0,
		"no-empty-label": 2,
		"no-empty-pattern": 1,
		"no-eval": 0,
		"no-implied-eval": 2,
		"no-extend-native": 2,
		"no-extra-bind": 1,
		"no-fallthrough": 2,
		"no-floating-decimal": 2,
		"no-implicit-coercion": 0,
		"no-invalid-this": 0,
		"no-lone-blocks": 0,
		"no-loop-func": 0,
		"no-magic-numbers": 0,
		"no-multi-spaces": 0,
		"no-multi-str": 2,
		"no-native-reassign": 2,
		"no-new-func": 2,
		"no-new-wrappers": 2,
		"no-new": 2,
		"no-octal-escape": 2,
		"no-octal": 1,
		"no-param-reassign": 0,
		"no-process-env": 0,
		"no-proto": 2,
		"no-redeclare": 2,
		"no-return-assign": [2, "except-parens"],
		"no-self-compare": 2,
		"no-sequences": 1,
		"no-throw-literal": 2,
		"no-unused-expressions": 2,
		"no-useless-call": 2,
		"no-useless-concat": 0,
		"no-void": 0,
		"no-warning-comments": 0,
		"no-with": 2,
		"radix": 1,
		"vars-on-top": 0,
		"wrap-iife": [2, "inside"],
		"yoda": 0,
		"strict": [2, "global"],
		"init-declarations": 0,
		"no-delete-var": 2,
		"no-label-var": 2,
		"no-shadow-restricted-names": 2,
		"no-shadow": 0,
		"no-undef-init": 0,
		"no-undef": [2, {"typeof": true}],
		"no-undefined": 0,
		"no-unused-vars": [1, {"args": "none"}],
		"no-use-before-define": [2, "nofunc"],

		"no-new-require": 2,

		"array-bracket-spacing": [2, "never"],
		"block-spacing": 0,
		"brace-style": [2, "1tbs", {"allowSingleLine": true}],
		"camelcase": 0,
		"comma-spacing": [2, {"before": false, "after": true}],
		"comma-style": [2, "last"],
		"computed-property-spacing": [2, "never"],
		"consistent-this": 0,
		"eol-last": os.EOL === '\n' ? [2, "unix"] : 0,
		"func-names": 0,
		"func-style": 0,
		"id-length": 0,
		"id-match": 0,
		"indent": [2, "tab"],
		"key-spacing": 0,
		"linebreak-style": os.EOL === '\n' ? [2, "unix"] : 0,
		"lines-around-comment": 0,
		"max-nested-callbacks": 0,
		"new-cap": [2, {"newIsCap": true, "capIsNew": false}],
		"new-parens": 2,
		"newline-after-var": 0,
		"no-array-constructor": 2,
		"no-continue": 0,
		"no-inline-comments": 0,
		"no-lonely-if": 0,
		"no-mixed-spaces-and-tabs": [2, "smart-tabs"],
		"no-multiple-empty-lines": [2, {"max": 2, "maxEOF": 1}],
		"no-negated-condition": 0,
		"no-nested-ternary": 0,
		"no-new-object": 2,
		"no-spaced-func": 2,
		"no-ternary": 0,
		"no-trailing-spaces": 2,
		"no-underscore-dangle": 0,
		"no-unneeded-ternary": 2,
		"object-curly-spacing": [2, "never"],
		"one-var": 0,
		"operator-assignment": 0,
		"operator-linebreak": [2, "after"],
		"padded-blocks": [2, "never"],
		"quote-props": 0,
		"quotes": 0,
		"require-jsdoc": 0,
		"semi-spacing": [2, {"before": false, "after": true}],
		"semi": [2, "always"],
		"sort-vars": 0,
		"space-after-keywords": [2, "always"],
		"space-before-blocks": [2, "always"],
		"space-before-function-paren": [2, {"anonymous": "always", "named": "never"}],
		"space-before-keywords": [2, "always"],
		"space-in-parens": [2, "never"],
		"space-infix-ops": 2,
		"space-return-throw-case": 2,
		"space-unary-ops": [2, {"words": true, "nonwords": false}],
		"spaced-comment": 0,
		"wrap-regex": 0,

		"no-var": 2,

		"validate-conditionals": 2
	}
};
