module.exports = {
  extends: ["next/core-web-vitals", "plugin:@typescript-eslint/recommended"],
  rules: {
    // Turn off any rule that's causing problems during development
    "@typescript-eslint/no-unused-vars": "warn", // Change from error to warning for now
    "@typescript-eslint/no-explicit-any": "warn",
    "prefer-const": "warn",

    // Or specify exceptions
    // '@typescript-eslint/no-unused-vars': ['error', { 'varsIgnorePattern': '^_', 'argsIgnorePattern': '^_' }],
  },
};
