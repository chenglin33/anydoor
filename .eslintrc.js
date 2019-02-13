module.exports = {
    root: true,
    parserOptions: {
      parser: 'babel-eslint'
    },
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true,
        "node": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": 2018
    },
    "plugins": [
      "vue" //插件，支持vue
    ],
    "rules": {
        "indent": [
            "error",
            "tab"
        ],
        "linebreak-style": [
            "error",
            "windows"
        ],
        "quotes": [
            "error",
            "single"
        ]
        // "semi": [
        //     "error",
        //     "always"
        // ]
    }
};
