module.exports = {
  root: true,
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    node: true,
  },

  extends: ['airbnb-base', 'prettier'],
  plugins: ['prettier'],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'prettier/prettier': [
      'error',
      {
        printWidth: 160,
        trailingComma: 'all',
        tabWidth: 2,
        semi: true,
        endOfLine: 'auto',
        singleQuote: true,
      },
    ],
    camelcase: 'off',
    'no-unused-vars': 'warn',
    'no-console': 'off',
    'class-methods-use-this': 'off',
    'linebreak-style': 'off',
    'max-len': 'off',
    'import/no-extraneous-dependencies': 'off',
  },
};
