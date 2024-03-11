module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "jest": true // Added Jest environment
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "overrides": [
        {
            "files": ["**/*.spec.js", "**/*.spec.jsx"],
            "env": {
                "jest": true
            }
        }
    ],
    "rules": {
    },
    "parser": "@typescript-eslint/parser",
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ]
};
