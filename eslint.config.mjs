// eslint.config.mjs
import nextPlugin from 'eslint-plugin-next';

/**
 * ESLint configuration for Next.js 14
 * Compatible with flat config (ESLint 9+)
 */
export default [
  {
    ignores: ['node_modules', '.next', 'dist'],
  },
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      next: nextPlugin,
    },
    extends: [
      'next',
      'next/core-web-vitals'
    ],
    rules: {
      'react/jsx-key': 'warn',
      'react/no-unknown-property': 'error',
      'no-unused-vars': 'warn',
      'semi': ['error', 'always'],
      'quotes': ['error', 'single']
    }
  }
];
