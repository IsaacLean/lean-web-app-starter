/**
 * This is the webpack configuration that is only used when running in
 * development mode.
 */
const path = require('path')
const {
  genSourceMaps,
  setMode,
  setOutput,
  setupDevServer,
} = require('ljas-webpack')
const { merge } = require('webpack-merge')

const mode = 'development'

module.exports = merge([
  setMode(mode),

  setOutput(mode, path.resolve(__dirname, `../build/${mode}`)),

  genSourceMaps(mode),

  setupDevServer('./build/development'),
])
