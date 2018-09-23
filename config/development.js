const merge = require('webpack-merge')

const parts = require('./parts')

module.exports = merge([
  parts.checkTypes(),

  parts.setupDevServer({
    host: process.env.HOST,
    port: process.env.PORT,
    historyApiFallback: true,
    hot: true
  }),

  parts.loadStyles(),

  parts.loadImgs(),

  parts.genSourceMaps({ type: 'cheap-module-eval-source-map' })
])
