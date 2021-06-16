module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'import'],
  rules: {
    'import/order': ['error'],
    'import/no-cycle': ['error'],
    'import/no-unresolved': ['error']
  },
  settings: {
    'import/resolver': 'eslint-import-resolver-typescript'
  }
};
