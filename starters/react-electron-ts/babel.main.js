module.exports = {
    presets: [
        ['@babel/preset-env', { modules: false, targets: { node: '18.16' } }],
        '@babel/preset-typescript',
    ],
}
