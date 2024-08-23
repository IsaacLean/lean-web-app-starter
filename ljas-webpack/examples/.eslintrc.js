module.exports = {
    env: {
        es2020: true,
        node: true,
        browser: true,
    },
    ignorePatterns: ['dist/'],
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
    },
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint', 'react'],
    rules: {
        'react/jsx-uses-vars': 'error',
    },
}
