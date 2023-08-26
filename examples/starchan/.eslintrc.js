const RULES_REACT = {
    'react/jsx-filename-extension': ['error', { extensions: ['.jsx', '.tsx'] }],
}

module.exports = {
    env: {
        es2021: true,
        node: true,
    },
    extends: ['eslint:recommended', 'prettier'],
    ignorePatterns: ['build/', 'coverage/'],
    parserOptions: {
        ecmaVersion: '2021',
        sourceType: 'module',
    },
    root: true,
    rules: {},
    overrides: [
        /* Source */
        {
            files: ['src/**/*.[jt]s?(x)'],
            extends: [
                'eslint:recommended',
                'plugin:react/recommended',
                'plugin:react/jsx-runtime',
                'plugin:@typescript-eslint/recommended',
                'prettier',
            ],
            parser: '@typescript-eslint/parser',
            plugins: ['react', '@typescript-eslint'],
            rules: RULES_REACT,
        },

        /* Prisma */
        {
            files: ['prisma/**/*.[jt]s'],
            extends: [
                'eslint:recommended',
                'plugin:@typescript-eslint/recommended',
                'prettier',
            ],
            parser: '@typescript-eslint/parser',
            plugins: ['@typescript-eslint'],
        },

        /* Tests */
        {
            env: {
                es2021: true,
                jest: true,
                node: true,
            },
            files: [
                'src/**/__mocks__/**/*.[jt]s?(x)',
                'src/**/__tests__/**/*.[jt]s?(x)',
                'src/**/?(*.)+(spec|test).[jt]s?(x)',
            ],
            extends: [
                'eslint:recommended',
                'plugin:react/recommended',
                'plugin:react/jsx-runtime',
                'plugin:@typescript-eslint/recommended',
                'plugin:jest/recommended',
                'prettier',
            ],
            parser: '@typescript-eslint/parser',
            plugins: ['react', '@typescript-eslint', 'jest'],
            rules: RULES_REACT,
        },
    ],
    settings: {
        react: {
            version: '18.2',
        },
    },
}
