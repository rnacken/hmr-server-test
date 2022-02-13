const React = require("react");
const ReactDOM = require("react-dom");
const App = require("./components/App.jsx");
const { loadableReady } = require("@loadable/component");

const root = document.getElementById("root");
const renderOrHydrate = root.innerHTML.trim().length ? "hydrate" : "render";

loadableReady(() => {
  const root = document.getElementById("root");
  ReactDOM[renderOrHydrate](React.createElement(App.default), root);
});

if (typeof module !== "undefined" && module.hot) {
  module.hot.accept();
}
