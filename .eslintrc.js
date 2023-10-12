/** @type {import('eslint').ESLint.ConfigData} */
module.exports = {
  root: true,
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'simple-import-sort', 'custom'],
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  rules: {
    'indent': ['error', 2],
    'quotes': ['error', 'single'],
    'jsx-quotes': ['error', 'prefer-single'],
    'semi': ['error', 'always'],
    'max-len': [
      'error',
      {
        code: 120,
      },
    ],
    'arrow-parens': ['error', 'always'],
    'eol-last': ['error', 'always'],
    'comma-dangle': [
      'error',
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'always-multiline',
      },
    ],
    'default-param-last': ['error'],
    'no-trailing-spaces': ['error'],
    'arrow-spacing': ['error'],
    'prefer-const': ['error'],

    '@typescript-eslint/no-var-requires': 'off',

    'simple-import-sort/imports': [
      'error',
      {
        groups: [['^@?\\w'], ['^[^.]']],
      },
    ],
    'simple-import-sort/exports': 'error',

    '@typescript-eslint/consistent-type-imports': ['error', { fixStyle: 'inline-type-imports' }],

    'custom/enforce-foo-bar': [
      'error',
      {
        classNamePattern: 'Service',
        getInstanceMethodName: 'getInstance',
        destroyInstanceMethodName: 'destroyInstance',
        instancePropertyName: '_instance',
      },
    ],
  },
  overrides: [
    {
      files: '**/*.contract.ts',
      rules: {
        '@typescript-eslint/no-namespace': 'off',
      },
    },
  ],
};
