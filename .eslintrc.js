module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  env: {
    node: true,
    browser: true,
    es6: true,
  },
  plugins: [
    'import',
    'filenames',
    'react',
    '@typescript-eslint',
    'react-hooks',
    'jsx-a11y',
    'promise',
    'unicorn',
  ],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:eslint-comments/recommended',
    'plugin:promise/recommended',
    'plugin:unicorn/recommended',
    'prettier',
    'prettier/react',
    'prettier/@typescript-eslint',
  ],
  settings: {
    react: {
      version: 'detect', // React version. "detect" automatically picks the version you have installed.
    },
    'import/extensions': ['.js', '.jsx', '.ts', '.tsx'],
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  rules: {
    // built in
    'no-underscore-dangle': 'off',
    'no-prototype-builtins': 'off',
    'no-alert': 1,
    'no-console': 1,
    'no-debugger': 1,
    'no-nested-ternary': 'off',
    'no-use-before-define': ['error'],

    // react
    'react/no-array-index-key': 'off',
    'react/no-unescaped-entities': 'off',
    'react/prop-types': 'off',
    'react/forbid-prop-types': 'off',
    'react/jsx-wrap-multilines': 'off', // prettier
    'react/jsx-indent': 'off', // prettier
    'react/jsx-no-target-blank': 'error', // only allowed if safe
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.tsx', '.jsx', '.js'],
      },
    ],
    'react/destructuring-assignment': [2, 'always'],
    'react/jsx-one-expression-per-line': 'off', // prettier

    // react-hooks
    'react-hooks/rules-of-hooks': 'error',

    // filenames
    'filenames/match-exported': [2, null, null, true],
    'filenames/no-index': 2,

    // promise
    'promise/always-return': 'off',
    'promise/catch-or-return': 'off',

    // typescript-eslint
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      },
    ],
    '@typescript-eslint/array-type': [
      'error',
      {
        default: 'array-simple',
      },
    ],

    // unicorn
    'unicorn/catch-error-name': 'off',
    'unicorn/prefer-node-append': 'off', // ie11
    'unicorn/prefer-node-remove': 'off', // ie11

    // import
    'import/prefer-default-export': 'off',
    'import/no-default-export': 2,

    'import/no-unresolved': ['error'],

    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: false,
        optionalDependencies: false,
        peerDependencies: false,
      },
    ],

    // jsx-a11y
    'jsx-a11y/href-no-hash': 'off',
  },
  overrides: [
    {
      files: '{src}/**/*.{ts,tsx}',
      rules: {
        'filenames/match-regex': [
          2,
          '^[A-z0-9]+(\\.(test|stories|style|types))*$',
          false,
        ],
      },
    },
    // Allow for devDependencies to be imported
    // in the project config, story and test files
    {
      files: ['.storybook/**', '**/*.stories.*'],
      rules: {
        'import/no-extraneous-dependencies': [
          'error',
          {
            devDependencies: true,
            optionalDependencies: false,
            peerDependencies: false,
          },
        ],
      },
    },
  ],
};
