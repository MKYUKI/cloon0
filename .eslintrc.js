// .eslintrc.js
module.exports = {
    ignorePatterns: ['node_modules/**', '.next/**', 'backend/**', 'venv/**'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      ecmaFeatures: {
        jsx: true,
      },
    },
    plugins: ['react', '@typescript-eslint'],
    extends: [
      'eslint:recommended',
      'plugin:react/recommended',
      'plugin:@typescript-eslint/recommended',
      'next',
      'next/core-web-vitals',
    ],
    rules: {
      // カスタムルールをここに追加
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  };
  