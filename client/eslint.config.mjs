import baseConfig from "../eslint.config.mjs";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import jsxA11y from "eslint-plugin-jsx-a11y";

export default [
  // Extend the base configuration
  ...baseConfig,

  // React configuration
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: {
      react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      "jsx-a11y": jsxA11y,
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        // Browser/Vite globals
        window: "readonly",
        document: "readonly",
        navigator: "readonly",
        localStorage: "readonly",
        sessionStorage: "readonly",
        fetch: "readonly",
        console: "readonly",
        // Vite-specific globals
        import: "readonly",
      },
    },
    settings: {
      react: {
        version: "detect", // Automatically detect React version
      },
    },
    rules: {
      // React Core Rules
      ...react.configs.recommended.rules,
      ...react.configs["jsx-runtime"].rules, // For new JSX transform

      // React Hooks Rules
      ...reactHooks.configs.recommended.rules,

      // React Refresh Rules (for HMR)
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],

      // JSX Accessibility Rules
      ...jsxA11y.configs.recommended.rules,

      // Custom React/Vite specific rules
      "react/react-in-jsx-scope": "off", // Not needed with new JSX transform
      "react/prop-types": "off", // If using TypeScript
      "react/jsx-uses-react": "off", // Not needed with new JSX transform
      "react/jsx-uses-vars": "error",
      "react/jsx-no-target-blank": "warn",
      "react/no-unescaped-entities": "warn",

      // Development-friendly rules
      "no-console": "warn", // Warn instead of error for development
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],

      // Vite-specific rules
      "no-undef": "off", // Vite handles imports
    },
  },

  // TypeScript + React specific rules
  {
    files: ["**/*.{ts,tsx}"],
    rules: {
      // TypeScript + React specific overrides
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-non-null-assertion": "warn",
    },
  },

  // Test files configuration
  {
    files: ["**/*.{test,spec}.{js,jsx,ts,tsx}", "**/__tests__/**/*"],
    languageOptions: {
      globals: {
        describe: "readonly",
        it: "readonly",
        test: "readonly",
        expect: "readonly",
        beforeAll: "readonly",
        afterAll: "readonly",
        beforeEach: "readonly",
        afterEach: "readonly",
        vi: "readonly", // Vitest
        jest: "readonly", // Jest
      },
    },
    rules: {
      // Relax rules for test files
      "@typescript-eslint/no-explicit-any": "off",
      "react/display-name": "off",
    },
  },

  // Vite config files
  {
    files: ["vite.config.{js,ts}", "vitest.config.{js,ts}"],
    languageOptions: {
      globals: {
        __dirname: "readonly",
        process: "readonly",
      },
    },
    rules: {
      // Allow default exports in config files
      "import/no-default-export": "off",
    },
  },

  // Additional ignores for Vite projects
  {
    ignores: [
      "dist/**",
      ".vite/**",
      "coverage/**",
      "public/**",
      "*.config.js",
      "*.config.ts",
    ],
  },
];
