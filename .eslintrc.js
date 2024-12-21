// .eslintrc.js
module.exports = {
    ignorePatterns: ['node_modules/**', '.next/**', 'backend/**', 'venv/**'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecmaVersion: 2020, // 最新のECMAScript仕様に対応
      sourceType: 'module',
      ecmaFeatures: {
        jsx: true, // JSXをサポート
      },
    },
    plugins: ['react', '@typescript-eslint'],
    extends: [
      'eslint:recommended', // 基本的なESLintのルール
      'plugin:react/recommended', // Reactの推奨ルール
      'plugin:@typescript-eslint/recommended', // TypeScript用の推奨ルール
      'next', // Next.jsの推奨ルール
      'next/core-web-vitals',
    ],
    rules: {
      // 必要に応じてカスタムルールを追加
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    },
    settings: {
      react: {
        version: 'detect', // インストールされているReactのバージョンを自動検出
      },
    },
    globals: {
      chrome: 'readonly', // 'chrome' をグローバルとして認識
    },
  };
