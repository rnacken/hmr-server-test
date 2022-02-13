const path = require("path");
const dist = path.join(process.cwd(), "projects/op/dist");
const nodeExternals = require("webpack-node-externals");

module.exports = (args) => {
  return {
    name: "startserver",
    mode: process.env.NODE_ENV,
    target: "node",
    externals: ["@loadable/component", nodeExternals()],
    entry: "./projects/op/src/server/server",
    output: {
      path: dist,
      filename: "server.js",
      libraryTarget: "commonjs2",
    },
    devtool: "source-map",
    externalsPresets: { node: true },
    resolve: {
      extensions: [".js", ".jsx", ".json", ".ts", ".tsx"],
    },
    // optimization: {
    //   moduleIds: 'named',
    //   chunkIds: 'named',
    // },
    module: {
      rules: [
        {
          test: /\.(tsx|ts|js|jsx|mjs)$/,
          exclude: [/node_modules/],
          use: {
            loader: "babel-loader",
          },
        },
      ],
    },
  };
};
