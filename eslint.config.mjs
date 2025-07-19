import js from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsparser from "@typescript-eslint/parser";
import prettier from "eslint-config-prettier";

export default [
  // Apply to all TypeScript and JavaScript files
  {
    files: ["**/*.{js,mjs,cjs,ts,tsx}"],
    languageOptions: {
      parser: tsparser,
      ecmaVersion: 2020,
      sourceType: "module",
      globals: {
        // Node.js globals
        global: "readonly",
        process: "readonly",
        Buffer: "readonly",
        __dirname: "readonly",
        __filename: "readonly",
        exports: "writable",
        module: "writable",
        require: "readonly",
      },
    },
    plugins: {
      "@typescript-eslint": tseslint,
    },
    rules: {
      // ESLint recommended rules
      ...js.configs.recommended.rules,

      // TypeScript ESLint recommended rules
      ...tseslint.configs.recommended.rules,

      // Custom rule overrides
      "@typescript-eslint/no-non-null-assertion": "off",

      // Disable conflicting rules that Prettier handles
      ...prettier.rules,
    },
  },

  // Ignore patterns (replaces .eslintignore)
  {
    ignores: [
      "node_modules/**",
      "dist/**",
      "build/**",
      ".turbo/**",
      "coverage/**",
      "*.min.js",
    ],
  },
];
