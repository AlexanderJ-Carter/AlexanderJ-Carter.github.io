import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import astro from 'eslint-plugin-astro';
import jsxA11y from 'eslint-plugin-jsx-a11y';

const browserGlobals = {
  console: 'readonly',
  document: 'readonly',
  window: 'readonly',
  navigator: 'readonly',
  location: 'readonly',
  history: 'readonly',
  localStorage: 'readonly',
  sessionStorage: 'readonly',
  fetch: 'readonly',
  Node: 'readonly',
  URL: 'readonly',
  URLSearchParams: 'readonly',
  HTMLElement: 'readonly',
  HTMLFormElement: 'readonly',
  HTMLInputElement: 'readonly',
  HTMLTextAreaElement: 'readonly',
  HTMLSelectElement: 'readonly',
  Event: 'readonly',
  MouseEvent: 'readonly',
  KeyboardEvent: 'readonly',
  CustomEvent: 'readonly',
  setTimeout: 'readonly',
  clearTimeout: 'readonly',
  setInterval: 'readonly',
  clearInterval: 'readonly',
  requestAnimationFrame: 'readonly',
  cancelAnimationFrame: 'readonly',
};

const nodeGlobals = {
  console: 'readonly',
  process: 'readonly',
};

// Node runtime globals for build scripts. Node 18+ exposes Web APIs (fetch,
// URL, Headers, Response, TextEncoder, atob, crypto) globally alongside
// Node-specific process/Buffer.
const nodeScriptGlobals = {
  ...nodeGlobals,
  URL: 'readonly',
  URLSearchParams: 'readonly',
  Buffer: 'readonly',
  fetch: 'readonly',
  Headers: 'readonly',
  Request: 'readonly',
  Response: 'readonly',
  TextEncoder: 'readonly',
  TextDecoder: 'readonly',
  atob: 'readonly',
  btoa: 'readonly',
  crypto: 'readonly',
};

// CommonJS scripts additionally expose require/module/exports/__dirname.
const cjsGlobals = {
  ...nodeScriptGlobals,
  require: 'readonly',
  module: 'readonly',
  exports: 'readonly',
  __dirname: 'readonly',
  __filename: 'readonly',
};

// Cloudflare Workers service-worker global scope (Request/Response/fetch/etc.).
const workerGlobals = {
  console: 'readonly',
  fetch: 'readonly',
  Request: 'readonly',
  Response: 'readonly',
  Headers: 'readonly',
  URL: 'readonly',
  URLSearchParams: 'readonly',
  FormData: 'readonly',
  Blob: 'readonly',
  File: 'readonly',
  TextEncoder: 'readonly',
  TextDecoder: 'readonly',
  atob: 'readonly',
  btoa: 'readonly',
  crypto: 'readonly',
  caches: 'readonly',
  AbortController: 'readonly',
  AbortSignal: 'readonly',
  ReadableStream: 'readonly',
  WritableStream: 'readonly',
  TransformStream: 'readonly',
};

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...astro.configs.recommended,
  {
    plugins: {
      'jsx-a11y': jsxA11y,
    },
    rules: {
      ...jsxA11y.configs.recommended.rules,
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      'no-empty': ['error', { allowEmptyCatch: true }],
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-var': 'off',
    },
  },
  {
    files: ['src/**/*.{ts,astro}'],
    languageOptions: {
      globals: browserGlobals,
    },
  },
  {
    files: ['src/i18n/pages/**/*.ts'],
    rules: {
      // Translation blobs are intentionally loosely typed dictionaries.
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
  {
    files: ['scripts/**/*.{js,mjs}', 'ops-portal/scripts/**/*.{js,mjs}'],
    languageOptions: {
      globals: nodeScriptGlobals,
    },
    rules: {
      'no-console': 'off',
    },
  },
  {
    files: ['scripts/**/*.cjs', 'ops-portal/scripts/**/*.cjs'],
    languageOptions: {
      globals: cjsGlobals,
    },
    rules: {
      'no-console': 'off',
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
  {
    files: ['workers/**/src/*.js', 'ops-portal/src/*.js'],
    languageOptions: {
      globals: workerGlobals,
    },
    rules: {
      'no-console': 'off',
    },
  },
  {
    files: ['src/**/*.astro'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      'jsx-a11y/media-has-caption': 'off',
    },
  },
  {
    ignores: [
      'dist/**',
      '.astro/**',
      'node_modules/**',
      'public/**',
      '**/*.config.mjs',
    ],
  },
];
