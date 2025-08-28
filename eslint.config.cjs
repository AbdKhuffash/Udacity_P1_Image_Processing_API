// eslint.config.cjs
const js = require('@eslint/js');
const ts = require('typescript-eslint');
const globals = require('globals');
const prettier = require('eslint-config-prettier');
const prettierPlugin = require('eslint-plugin-prettier');

module.exports = [
  // Ignore build/cache folders
  { ignores: ['dist', 'node_modules', 'assets/thumb'] },

  // JS (incl. this config file) — allow CommonJS & Node globals, and allow require()
  {
    files: ['**/*.js', '**/*.cjs', '**/*.mjs'],
    languageOptions: {
      globals: { ...globals.node }
    },
    rules: {
      // Turn off TS-only rule for JS files
      '@typescript-eslint/no-require-imports': 'off',
      // And no-undef for module/__dirname in CJS config files
      'no-undef': 'off'
    }
  },

  // Base JS recommended rules
  js.configs.recommended,

  // TypeScript recommended (fast, non–type-checked)
  ...ts.configs.recommended,

  // Project TS settings
  {
    files: ['**/*.ts'],
    languageOptions: {
      globals: { ...globals.node }
      // If you want type-aware lint later, add:
      // parserOptions: { project: ['./tsconfig.json'], tsconfigRootDir: __dirname }
      // and replace ts.configs.recommended with ts.configs.recommendedTypeChecked above.
    },
    plugins: { prettier: prettierPlugin },
    rules: {
      'prettier/prettier': 'error',
      // allow unused args that start with _
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      // keep require() imports forbidden in TS (use import syntax instead)
      '@typescript-eslint/no-require-imports': 'error'
    }
  },

  // Tests: enable Jasmine globals in TS specs
  {
    files: ['**/*.spec.ts'],
    languageOptions: { globals: { ...globals.jasmine } }
  },

  // Turn off rules that conflict with Prettier
  prettier
];
