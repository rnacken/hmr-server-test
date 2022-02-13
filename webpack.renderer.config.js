const path = require("path");
const webpack = require("webpack");
const dist = path.join(process.cwd(), "projects/op/dist");
const LoadablePlugin = require("@loadable/webpack-plugin");
const nodeExternals = require("webpack-node-externals");

module.exports = (args) => {
  return {
    name: "server",
    mode: process.env.NODE_ENV,
    target: "node",
    entry: "./projects/op/src/server/renderer",
    output: {
      path: dist,
      filename: "renderer.js",
      libraryTarget: "commonjs2",
    },
    plugins: [
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 1,
      }),
    ],
    devtool: "source-map",
    externalsPresets: { node: true },
    externals: ["@loadable/component", nodeExternals()],
    resolve: {
      extensions: [".js", ".jsx", ".json", ".ts", ".tsx"],
    },
    //   fallback: {
    //     abc: false, // do not include a polyfill for abc
    // xyz: path.resolve(__dirname, "components/App.js"), // include a polyfill for xyz
    //   },
    // },
    module: {
      rules: [
        {
          test: /\.(tsx|ts|js|jsx|mjs)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
          },
        },
      ],
    },
  };
};
