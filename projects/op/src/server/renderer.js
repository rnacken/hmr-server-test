import React from "react";
const renderToString = require("react-dom/server").renderToString;
const App = require("../components/App.jsx").default;
const path = require("path");
import { ChunkExtractor } from "@loadable/server";

const serverRenderer = ({ clientStats, serverStats, foo }) => {
  return (req, res, next) => {
    const statsFile = path.resolve("./projects/op/dist/loadable-stats.json");
    const extractor = new ChunkExtractor({ statsFile, publicPath: "/dist" });
    const jsx = extractor.collectChunks(<App />);
    res.status(200).send(`
            <!doctype html>
            <html>
            <head>
                <title>${foo}</title>
                ${extractor.getLinkTags()}
            </head>
            <body>
                <div id="root">${renderToString(jsx)}</div>
                ${extractor.getScriptTags()}
            </body>
            </html>
        `);
  };
};

export default serverRenderer;
