import js from '@eslint/js';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import * as vueParser from 'vue-eslint-parser';
import vue from 'eslint-plugin-vue';
import prettier from 'eslint-plugin-prettier';

export default [
  js.configs.recommended,
  {
    files: ['**/*.{js,ts,vue}'],
    ignores: ['dist/**', 'node_modules/**'],
    plugins: {
      '@typescript-eslint': tsPlugin,
      vue: vue,
      prettier: prettier,
    },
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      parser: vueParser,
      parserOptions: {
        parser: tsParser,
        extraFileExtensions: ['.vue'],
      },
      globals: {
        // 브라우저 및 Node.js 글로벌 변수 정의
        process: 'readonly',
        window: 'readonly',
        document: 'readonly',
        localStorage: 'readonly',
        fetch: 'readonly',
        URLSearchParams: 'readonly',
        HTMLElement: 'readonly',
        IntersectionObserver: 'readonly',
        console: 'readonly',
      },
    },
    rules: {
      // ESLint 규칙
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      '@typescript-eslint/no-unused-vars': ['warn'],
      '@typescript-eslint/no-explicit-any': 'warn',

      // Vue 및 Prettier 규칙
      ...vue.configs['vue3-recommended'].rules,
      ...prettier.configs.recommended.rules,
    },
  },
];
