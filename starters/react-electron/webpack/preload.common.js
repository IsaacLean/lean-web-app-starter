const setupNodeExternals = require('ljas-webpack/setupNodeExternals')
const { merge } = require('webpack-merge')

const { PATH_PRELOAD_SRC } = require('../PATHS')

module.exports = merge([
    {
        entry: { preload: `${PATH_PRELOAD_SRC}/index.js` },

        output: {
            clean: true,
            filename: '[name].js',
        },

        target: 'electron-preload',
    },

    setupNodeExternals({
        // TODO: remove this before going to prod
        additionalModuleDirs: ['../../node_modules'],
    }),
])
