module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "google",
    "plugin:@typescript-eslint/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: ["tsconfig.json", "tsconfig.dev.json"],
    sourceType: "module",
  },
  ignorePatterns: [
    "/lib/**/*", // Ignore built files.
    "/generated/**/*", // Ignore generated files.
  ],
  plugins: [
    "@typescript-eslint",
    "import",
  ],
  rules: {
    "quotes": ["error", "double"],
    "import/no-unresolved": 0,
    "indent": "off", // Disable indent from google extend
    "@typescript-eslint/indent": ["error", 2, {"SwitchCase": 1}], // Re-enable with desired config
    "max-len": ["error", {"code":120,"tabWidth":2,"ignoreComments":true,"ignoreUrls":true,"ignoreStrings":true,"ignoreTemplateLiterals":true,"ignoreRegExpLiterals":true}],
    "object-curly-spacing": ["error", "never"],
    "eol-last": ["error", "always"],
  },
};