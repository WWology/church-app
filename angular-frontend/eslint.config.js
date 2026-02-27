// @ts-check
const {defineConfig} = require('eslint/config');
const eslint = require('@eslint/js');
const tseslint = require('typescript-eslint');
const angular = require('angular-eslint');
const prettierRecommended = require('eslint-plugin-prettier/recommended')

module.exports = defineConfig(
  {
    files: ['**/*.ts'],
    extends: [
      eslint.configs.recommended,
      prettierRecommended,
      ...tseslint.configs.recommended,
      ...tseslint.configs.stylistic,
      ...angular.configs.tsRecommended,
    ],
    processor: angular.processInlineTemplates,
    rules: {
      // our project thinks using renaming inputs is ok
      '@angular-eslint/no-input-rename': 'off',
    },
  },
  {
    files: ['**/*.html'],
    extends: [
      prettierRecommended,
      ...angular.configs.templateRecommended,
      ...angular.configs.templateAccessibility,
    ],
    rules: {
      // our project thinks using negated async pipes is ok
      '@angular-eslint/template/no-negated-async': 'off',
    },
  },
);
