const compileTs = require('ljas-webpack/compileTs')
const setupNodeExternals = require('ljas-webpack/setupNodeExternals')
const { buildSourceMaps } = require('ljas-webpack')
const { merge } = require('webpack-merge')
const { PATH_BUILD, PATH_SRC } = require('./PATHS')

const config = merge([
    {
        entry: './src/index.ts',

        output: {
            clean: true,
            filename: 'app.js',
            path: PATH_BUILD,
        },

        target: 'node18.16',
    },

    compileTs({
        rule: {
            include: PATH_SRC,
            exclude: [
                /node_modules/,
                /__mocks__\/.*.(j|t)s$/,
                /__tests__\/.*.(j|t)s$/,
                /\.(spec|test)\.(j|t)s$/,
            ],
        },
    }),

    setupNodeExternals({
        // TODO: remove this before going to prod
        additionalModuleDirs: ['../../node_modules'],
    }),
])

module.exports = (env, { mode }) => {
    switch (mode) {
        case 'production': {
            const configProd = merge(config, buildSourceMaps('source-map'))
            console.log('DEBUG CONFIG', config, JSON.stringify(config))
            return configProd
        }

        default: {
            const configDev = merge(
                config,
                buildSourceMaps('cheap-module-source-map')
            )
            console.log('DEBUG CONFIG', configDev, JSON.stringify(configDev))
            return configDev
        }
    }
}
