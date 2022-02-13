module.exports = {
  presets: [
    [
      "@babel/env",
      {
        targets: {
          node: "current",
        },
      },
    ],
    "@babel/preset-react",
  ],
  plugins: [
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-proposal-object-rest-spread",
    "@loadable/babel-plugin",
  ],
  ignore: ["node_modules"],
};

// {
//   "presets": [
//     [
//       "@babel/env",
//       {
//         "targets": {
//           "node": "current"
//         }
//       },
//       "@babel/preset-react"
//     ]
//   ],
//   "plugins": [
//     "@babel/plugin-proposal-class-properties",
//     "@babel/plugin-proposal-object-rest-spread"
//   ],
//   "ignore": ["node_modules"]
// }
