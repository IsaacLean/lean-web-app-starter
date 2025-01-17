const RULES_REACT = {
  "react/jsx-filename-extension": "error",
};

module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:flowtype/recommended",
    "plugin:jest/recommended",
    "prettier",
  ],
  parserOptions: {
    ecmaVersion: "2018",
    sourceType: "module",
  },
  root: true,
  rules: RULES_REACT,
  settings: {
    react: {
      flowVersion: "0.83",
      version: "16.6",
    },
  },
};
