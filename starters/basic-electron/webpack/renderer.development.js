const {
  buildSourceMaps,
  ignoreWatch,
  injectCss,
  loadFonts,
  loadImages,
  setupDevServer,
} = require("ljas-webpack");
const { merge } = require("webpack-merge");

const { PATH_RENDERER_BUILD_DEV, PATH_RENDERER_SRC } = require("../PATHS");

if (!process.env.PORT_WEBPACK_DEV_SERVER) {
  throw new Error("🔴 webpack-dev-server port was not set");
}

module.exports = merge([
  {
    mode: "development",

    output: {
      filename: "[name].js",
      path: PATH_RENDERER_BUILD_DEV,
    },
  },

  buildSourceMaps("cheap-module-source-map"),

  ignoreWatch(/node_modules/),

  injectCss({ rule: { include: PATH_RENDERER_SRC } }),

  loadFonts({
    rule: {
      generator: { filename: "assets/[name][ext][query]" },
      // Export the asset as a data URI if it's below the maxSize threshold,
      // otherwise emit it as a separate file and export the URL
      parser: { dataUrlCondition: { maxSize: 50000 } },
      type: "asset",
    },
  }),

  loadImages({
    rule: {
      generator: { filename: "assets/[name][ext][query]" },
      // Export the asset as a data URI if it's below the maxSize threshold,
      // otherwise emit it as a separate file and export the URL
      parser: { dataUrlCondition: { maxSize: 15000 } },
      type: "asset",
    },
  }),

  setupDevServer(),
]);
