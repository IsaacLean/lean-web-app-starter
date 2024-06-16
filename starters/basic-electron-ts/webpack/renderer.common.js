const buildHtml = require('ljas-webpack/buildHtml')
const compileTs = require('ljas-webpack/compileTs')
const { merge } = require('webpack-merge')

const tsconfigBuildOverride = require('./tsconfigBuildOverride')
const { PATH_COMMON_SRC, PATH_RENDERER_SRC } = require('../PATHS')

module.exports = merge([
    {
        entry: { app: `${PATH_RENDERER_SRC}/index.ts` },

        output: { clean: true },
    },

    buildHtml({
        title: 'ljas-basic-electron-ts',
        template: 'src/renderer/index.ejs',
    }),

    compileTs({
        rule: {
            include: [PATH_COMMON_SRC, PATH_RENDERER_SRC],
            exclude: [
                /node_modules/,
                /__mocks__\/.*.(j|t)s$/,
                /__tests__\/.*.(j|t)s$/,
                /\.(spec|test)\.(j|t)s$/,
            ],
        },
        babelLoaderCache: true,
        forkTsChecker: {
            typescript: {
                configOverwrite: {
                    include: ['src/renderer/**/*', 'src/global.d.ts'],
                    ...tsconfigBuildOverride,
                },
            },
        },
    }),
])
