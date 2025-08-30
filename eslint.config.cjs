// eslint.config.cjs
const tseslint = require('typescript-eslint');
const globals = require('globals');
const prettier = require('eslint-config-prettier');
const prettierPlugin = require('eslint-plugin-prettier');

module.exports = [
  {
    ignores: [
      'dist',
      'node_modules',
      'assets/thumb',
      '**/*.js',
      '**/*.cjs',
      '**/*.mjs',
      '**/*.json',
    ],
  },

  ...tseslint.configs.recommended,

  //TS files only
  {
    files: ['src/**/*.ts'],
    languageOptions: {
      globals: { ...globals.node },
    },
    plugins: { prettier: prettierPlugin },
    rules: {
      'prettier/prettier': 'error',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-require-imports': 'error',
    },
  },
  prettier,
];
