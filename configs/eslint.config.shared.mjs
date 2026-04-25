// Shared ESLint flat config for Bckstge TypeScript projects.
//
// Source of truth for the rules in ~/.claude/CLAUDE.md:
//   "Functions < 50 lines. Max 3 nesting levels."
//   plus sonarjs cognitive-complexity + duplicate-string warnings as a
//   free CodeScene proxy.
//
// Consumed by (relative import, no npm publish required):
//   - fitkoh-bridge
//   - FitCollab (FitKoh)
//   - homebase
//   - samphan
//   - visa_extension
//
// Each project's eslint.config.mjs does:
//   import shared from "../design-system/configs/eslint.config.shared.mjs";
//   export default shared;
//
// To customize per-project (extra ignores, framework rules), spread and
// override:
//   import shared from "../design-system/configs/eslint.config.shared.mjs";
//   export default [...shared, { ignores: ["wrangler.toml"] }];
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import sonarjs from "eslint-plugin-sonarjs";
import reactHooks from "eslint-plugin-react-hooks";

export default tseslint.config(
  {
    ignores: [
      "dist/**",
      "build/**",
      "out/**",
      "node_modules/**",
      ".wrangler/**",
      ".next/**",
      "migrations/**",
      "drizzle/**",
      "**/*.config.{js,mjs,ts}",
      "**/sw.js",
      "**/public/**",
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  sonarjs.configs.recommended,
  // React hooks rules — applied to .tsx/.jsx files only via the plugin's
  // own scoping. Safe to include for non-React projects (no-op there).
  {
    plugins: { "react-hooks": reactHooks },
    rules: {
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
    },
  },
  {
    rules: {
      // Hard caps from CLAUDE.md
      complexity: ["error", 10],
      "max-lines-per-function": [
        "error",
        { max: 50, skipBlankLines: true, skipComments: true, IIFEs: true },
      ],
      "max-lines": ["error", { max: 300, skipBlankLines: true, skipComments: true }],
      "max-depth": ["error", 3],
      "max-params": ["error", 4],
      "max-nested-callbacks": ["error", 3],

      // Sonar tunings (defaults are noisy)
      "sonarjs/cognitive-complexity": ["error", 15],
      "sonarjs/no-duplicate-string": ["warn", { threshold: 4 }],
      "sonarjs/no-commented-code": "off",

      // TS noise reduction
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/no-explicit-any": "warn",
    },
  },
  {
    // Tests get more breathing room — fixtures and table-driven cases
    // legitimately exceed function/file size limits.
    files: ["**/*.test.{ts,tsx}", "**/*.spec.{ts,tsx}", "**/test/**", "**/tests/**"],
    rules: {
      "max-lines-per-function": "off",
      "max-lines": "off",
      "sonarjs/no-duplicate-string": "off",
      "sonarjs/cognitive-complexity": "off",
    },
  },
);
