import baseConfig from "../eslint.config.mjs";
import nodePlugin from "eslint-plugin-node";
import securityPlugin from "eslint-plugin-security";

export default [
  // Extend the base configuration
  ...baseConfig,

  // Node.js/Server configuration
  {
    files: ["**/*.{js,ts}"],
    plugins: {
      node: nodePlugin,
      security: securityPlugin,
    },
    languageOptions: {
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
        console: "readonly",
        setTimeout: "readonly",
        clearTimeout: "readonly",
        setInterval: "readonly",
        clearInterval: "readonly",
        setImmediate: "readonly",
        clearImmediate: "readonly",
      },
    },
    rules: {
      // Node.js recommended rules
      ...nodePlugin.configs.recommended.rules,

      // Security rules
      ...securityPlugin.configs.recommended.rules,

      // Server-specific rules
      "no-console": "off", // Allow console logs in server
      "node/no-missing-import": "off", // TypeScript handles this
      "node/no-unsupported-features/es-syntax": "off", // Using modern Node.js
      "node/no-unpublished-import": "off", // Dev dependencies are fine
      "node/shebang": "off", // Not needed for most server files

      // TypeScript + Node.js specific
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-explicit-any": "warn",

      // Performance and best practices
      "prefer-const": "error",
      "no-var": "error",
      "object-shorthand": "error",
      "prefer-template": "error",

      // Security enhancements
      "security/detect-object-injection": "warn",
      "security/detect-non-literal-regexp": "warn",
      "security/detect-unsafe-regex": "error",
      "security/detect-buffer-noassert": "error",
      "security/detect-child-process": "warn",
      "security/detect-disable-mustache-escape": "error",
      "security/detect-eval-with-expression": "error",
      "security/detect-no-csrf-before-method-override": "error",
      "security/detect-non-literal-fs-filename": "warn",
      "security/detect-non-literal-require": "warn",
      "security/detect-possible-timing-attacks": "warn",
      "security/detect-pseudoRandomBytes": "error",
    },
  },

  // API/Route files specific rules
  {
    files: [
      "**/routes/**/*.{js,ts}",
      "**/api/**/*.{js,ts}",
      "**/controllers/**/*.{js,ts}",
    ],
    rules: {
      // API-specific rules
      "consistent-return": "error", // Ensure consistent returns in handlers
      "no-unused-vars": "off", // Let TypeScript handle this
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^(req|res|next|_)",
          varsIgnorePattern: "^_",
        },
      ],
    },
  },

  // Middleware files
  {
    files: ["**/middleware/**/*.{js,ts}"],
    rules: {
      // Middleware should always call next or end response
      "consistent-return": "error",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^(req|res|next|err|_)",
        },
      ],
    },
  },

  // Test files configuration
  {
    files: ["**/*.{test,spec}.{js,ts}", "**/__tests__/**/*"],
    languageOptions: {
      globals: {
        // Testing framework globals
        describe: "readonly",
        it: "readonly",
        test: "readonly",
        expect: "readonly",
        beforeAll: "readonly",
        afterAll: "readonly",
        beforeEach: "readonly",
        afterEach: "readonly",
        jest: "readonly",
        vi: "readonly", // Vitest
        // Node.js test runner globals
        mock: "readonly",
        suite: "readonly",
      },
    },
    rules: {
      // Relax rules for test files
      "@typescript-eslint/no-explicit-any": "off",
      "security/detect-object-injection": "off",
      "node/no-unpublished-require": "off",
      "no-console": "off",
    },
  },

  // Configuration files
  {
    files: [
      "*.config.{js,ts}",
      "tsup.config.{js,ts}",
      "jest.config.{js,ts}",
      "vitest.config.{js,ts}",
    ],
    languageOptions: {
      globals: {
        __dirname: "readonly",
        process: "readonly",
        module: "writable",
        exports: "writable",
      },
    },
    rules: {
      // Allow default exports and require in config files
      "node/no-unpublished-require": "off",
      "@typescript-eslint/no-var-requires": "off",
      "security/detect-non-literal-require": "off",
    },
  },

  // Database/ORM files
  {
    files: [
      "**/models/**/*.{js,ts}",
      "**/schemas/**/*.{js,ts}",
      "**/migrations/**/*.{js,ts}",
      "**/seeders/**/*.{js,ts}",
    ],
    rules: {
      // Database files often have different patterns
      "@typescript-eslint/no-explicit-any": "warn",
      "security/detect-object-injection": "warn",
    },
  },

  // Scripts and utilities
  {
    files: ["**/scripts/**/*.{js,ts}", "**/utils/**/*.{js,ts}"],
    rules: {
      // Scripts might need console output
      "no-console": "warn",
      "@typescript-eslint/no-explicit-any": "warn",
    },
  },

  // Additional ignores for server projects
  {
    ignores: [
      "dist/**",
      "build/**",
      "coverage/**",
      "logs/**",
      "tmp/**",
      "uploads/**",
      "public/**",
      "*.log",
    ],
  },
];
