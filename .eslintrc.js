module.exports = {
  root: true,
  parserOptions: {
    parser: "babel-eslint",
    ecmaVersion: 10,
    sourceType: "module"
  },
  env: {
    node: true,
    browser: true,
    es6: true
  },
  extends: [
    "plugin:vue/recommended",
    "eslint:recommended",
    "prettier/vue",
    "plugin:prettier/recommended"
  ],
  plugins: ["prettier"],
  globals: {
    __statics: true,
    __ryo_bin: true
  },
  // add your custom rules here
  rules: {
    // allow debugger during development
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off"
    // "vue/component-name-in-template-casing": ["error", "PascalCase"]
  }
};
