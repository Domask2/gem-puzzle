module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
        "extends": [
            "airbnb-base",
            "prettier"
        ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "rules": {
        "no-unused-vars": "off",
        "no-use-before-define": ["error", { "functions": false, "classes": false }],
        "class-methods-use-this": "off",
        "eslint import/newline-after-import": "off",
        "import/prefer-default-export": "off",
        "import/no-default-export": "error",
        "no-default-export": false,
        "import/newline-after-import": "off",
        "props": false,
        "no-param-reassign": 0,
        "import/no-named-as-default": 0,
        "no-shadow": "off",
        "generators": "never"
    }
};
