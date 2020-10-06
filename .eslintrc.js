module.exports = {
  root: true,
  parserOptions: {
    parser: "babel-eslint"
  },
  env: {
    node: true,
    browser: true
  },
  extends: [
    // "plugin:prettier/recommended",
    "plugin:vue/recommended",
    "eslint:recommended",
    "prettier/vue"
  ],
  // required to lint *.vue files
  plugins: ["vue", "prettier"],
  globals: {
    __statics: true,
    __ryo_bin: true
  },
  // add your custom rules here
  rules: {
    // allow debugger during development
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "vue/component-name-in-template-casing": ["error", "PascalCase"]
  }
};
