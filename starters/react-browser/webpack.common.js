const buildHtml = require("ljas-webpack/buildHtml");
const { merge } = require("webpack-merge");

const { PATH_SRC } = require("./PATHS");

module.exports = merge([
  {
    entry: { app: `${PATH_SRC}/index.jsx` },

    output: { clean: true },
  },

  buildHtml({ title: "ljas-react-browser" }),
]);
