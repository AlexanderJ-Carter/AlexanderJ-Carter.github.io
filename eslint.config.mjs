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
        { argsIgnorePattern: '^_' },
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
    files: ['scripts/**/*.js'],
    languageOptions: {
      globals: nodeGlobals,
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
