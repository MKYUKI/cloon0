// eslint.config.mjs
export default [
  {
    ignores: ['node_modules/**', '.next/**', 'backend/**', 'venv/**'],
  },
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      ecmaFeatures: {
        jsx: true,
      },
    },
    plugins: {
      react: require('eslint-plugin-react'),
      '@typescript-eslint': require('@typescript-eslint/eslint-plugin'),
    },
    rules: {
      // カスタムルールをここに追加
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    env: {
      browser: true,
      node: true,
      es6: true,
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
];
