module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
    overrides: [],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 13,
        sourceType: 'module',
    },
    plugins: ['@typescript-eslint', 'prettier'],
    rules: {
        'prettier/prettier': 'error',
        semi: ['warn', 'always'],
        quotes: ['error', 'single'],
        'no-var': 'error',
        'prefer-const': 'error',
        '@typescript-eslint/no-var-requires': 'warn',
    },
};
