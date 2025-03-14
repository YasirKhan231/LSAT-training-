import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.config({
    extends: ["next/core-web-vitals", "next/typescript"],
    rules: {
      "react/no-unescaped-entities": "off", // Disable this rule
      "@next/next/no-page-custom-font": "off", // Disable this rule
      "@typescript-eslint/no-explicit-any": "warn", // Warn instead of error for `any`
      "@typescript-eslint/no-unused-vars": "warn", // Warn instead of error for unused vars
      "react-hooks/exhaustive-deps": "warn", // Warn instead of error for missing deps
    },
  }),
];

export default eslintConfig;
