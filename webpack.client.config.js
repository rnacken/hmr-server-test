const path = require("path");
const webpack = require("webpack");
const dist = path.join(process.cwd(), "projects/op/dist/client");
const LoadablePlugin = require("@loadable/webpack-plugin");

module.exports = (args) => {
  return {
    name: "client",
    mode: process.env.NODE_ENV,
    target: "web",
    entry: [
      ...(process.env.NODE_ENV === "development"
        ? ["webpack-hot-middleware/client?reload=true&noInfo=true"]
        : []),
      "./projects/op/src/client",
    ],
    output: {
      path: dist,
      filename: "client.js",
    },
    plugins: [
      new LoadablePlugin({
        outputAsset: false, // to avoid writing loadable-stats in the same output as client
        writeToDisk: true,
        filename: path.resolve(
          process.cwd(),
          `projects/op/dist/loadable-stats.json`
        ),
      }),
      ...(process.env.NODE_ENV === "development"
        ? [new webpack.HotModuleReplacementPlugin()]
        : []),
    ],
    devtool: "source-map",
    resolve: {
      extensions: [".js", ".jsx", ".json", ".ts", ".tsx"],
    },
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
