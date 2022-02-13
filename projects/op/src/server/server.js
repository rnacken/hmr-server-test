import express from "express";

const app = express();

if (process.env.NODE_ENV === "development") {
  console.log("NODE ENV = DEVELOPMENT");

  const webpack = require("webpack");
  const webpackDevMiddleware = require("webpack-dev-middleware");

  const webpackHotMiddleware = require("webpack-hot-middleware");

  const webpackHotServerMiddleware = require("webpack-hot-server-middleware");
  const clientConfig = require("../../../../webpack.client.config.js");
  const serverConfig = require("../../../../webpack.renderer.config.js");

  const compiler = webpack([clientConfig(), serverConfig()]);

  app.use(
    webpackDevMiddleware(compiler, {
      publicPath: "/dist",
      serverSideRender: true,
      // writeToDisk: true,
    })
  );

  app.use(
    webpackHotMiddleware(
      compiler.compilers.find((compiler) => compiler.name === "client")
    )
  );

  app.use(
    webpackHotServerMiddleware(compiler, {
      serverRendererOptions: {
        foo: "Bar",
      },
    })
  );
} else {
  console.log("NODE ENV = PRODUCTION");
  const renderer = require("./renderer.js").default;
  app.use("/dist", express.static("./projects/op/dist/client"));

  // production server
  app.get("/*", (req, res) => {
    renderer({ foo: "PROD" })(req, res);
  });
}

app.listen(6060, () => {
  console.log("Server started: http://localhost:6060/");
});
