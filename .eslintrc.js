module.exports = {
  // 既存の設定
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'next/core-web-vitals',
  ],
  plugins: ['@typescript-eslint', 'react', 'react-hooks', 'prettier'],
  rules: {
    'prettier/prettier': 'error',
    // 既存のルール
  },
  // その他の設定
};
