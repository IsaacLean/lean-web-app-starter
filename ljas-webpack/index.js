/**
 * ljas-webpack
 *
 * This build was tested with:
 * - webpack@^5.74.0
 * - webpack-cli@^4.10.0
 * - webpack-merge@^5.8.0
 */
const path = require('path')

/**
 * Compile TypeScript files with Babel:
 * https://webpack.js.org/loaders/babel-loader
 *
 * Note that this does not perform type checking since that is handled by checkTypes().
 *
 * Peer dependencies:
 * - @babel/core@^7.18.13
 * - @babel/preset-env@^7.18.10
 * - @babel/preset-typescript@^7.18.6
 * - babel-loader@^8.2.5
 * - typescript@^4.8.2
 */
exports.compileTS = (mode) => ({
  module: {
    rules: [
      {
        test: /(\.m?j|t)s$/,
        include: path.resolve(__dirname, 'src'),
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-typescript'],
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.json', '.ts', '.tsx', '.wasm'],
  },
})

/**
 * Compile React TypeScript files with Babel:
 * https://webpack.js.org/loaders/babel-loader
 *
 * Note that this does not perform type checking since that is handled by checkTypes().
 *
 * Peer dependencies:
 * - @babel/core@^7.18.13
 * - @babel/preset-env@^7.18.10
 * - @babel/preset-react@^7.18.6
 * - @babel/preset-typescript@^7.18.6
 * - babel-loader@^8.2.5
 * - typescript@^4.8.2
 */
exports.compileReact = () => ({
  module: {
    rules: [
      {
        test: /(\.m?j|t)sx?$/,
        include: path.resolve(__dirname, '../src'),
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              [
                '@babel/preset-react',
                {
                  runtime: 'automatic',
                },
              ],
              '@babel/preset-typescript',
            ],
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx', '.wasm'],
  },
})

/**
 * Emit TypeScript declaration files with ts-loader:
 * https://webpack.js.org/guides/typescript/#loader
 *
 * Peer dependencies:
 * - ts-loader@^9.3.1
 * - typescript@^4.8.2
 */
exports.emitDeclarationFiles = () => ({
  module: {
    rules: [
      {
        test: /(\.m?j|t)s$/,
        include: path.resolve(__dirname, 'src'),
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
          options: {
            configFile: 'tsconfig.production.json',
            transpileOnly: false,
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.json', '.ts', '.tsx', '.wasm'],
  },
})

/**
 * Run the develoment server with webpack-dev-server:
 * https://webpack.js.org/configuration/dev-server
 *
 * Peer dependency: webpack-dev-server@^4.10.1
 */
exports.setupDevServer = () => ({
  devServer: {
    static: './build/development',
  },
})

/**
 * Generate source maps.
 * The type of source maps generated will differe depending on the mode.
 * For production mode, building them will be slow, but the mapping quality will be high.
 * For development mode, building source maps will usually be fast, but there will be lower mapping quality.
 *
 * For more information:
 * https://webpack.js.org/configuration/devtool
 *
 * @param {string} mode webpack mode (https://webpack.js.org/configuration/mode)
 */
exports.genSourceMaps = (mode) => {
  const config = {}

  if (mode === 'production') {
    config.devtool = 'source-map'
  } else {
    if (mode !== 'development') {
      console.warn(
        'Encountered an unsupported mode. Falling back to development source maps.'
      )
    }

    config.devtool = 'eval-cheap-module-source-map'
  }

  return config
}

/**
 * Set webpack's mode.
 *
 * For more information:
 * https://webpack.js.org/configuration/mode
 *
 * @param {('development'|'none'|'production')} mode webpack mode (https://webpack.js.org/configuration/mode)
 */
exports.setMode = (mode) => ({
  mode,
})

/**
 * Configure webpack's output.
 * Hashes will only be included in file names for production mode.
 *
 * For more information:
 * https://webpack.js.org/configuration/output
 *
 * @param {string} mode webpack mode (https://webpack.js.org/configuration/mode)
 */
exports.setOutput = (mode) => {
  const config = {
    output: {
      clean: true,
      path: path.resolve(__dirname, `../build/${mode}`),
    },
  }

  if (mode === 'production') {
    config.output.chunkFilename = '[name].[contenthash].js'
    config.output.filename = '[name].[contenthash].js'
    config.output.assetModuleFilename = '[name].[contenthash][ext][query]'
  } else {
    if (mode !== 'development') {
      console.warn(
        'Encountered an unsupported mode. Falling back to development output settings.'
      )
    }

    config.output.filename = 'script.js'
  }

  return config
}

/**
 * Set webpack's target.
 *
 * For more information:
 * https://webpack.js.org/configuration/target
 *
 * @param {string} target webpack target (https://webpack.js.org/configuration/target)
 */
exports.setTarget = (target) => ({
  target,
})
