const path = require("path");
const webpack = require("webpack");
const BrowserSyncPlugin = require("browser-sync-webpack-plugin");

module.exports = {
  entry: {
    app: [ path.resolve(__dirname, 'app/scripts/main.js') ]
  },
  output: {
    path: path.resolve(__dirname, "./public"),
    filename: "app.js"
  },
  devtool: "cheap-module-eval-source-map",
  module: {
    rules: [
      {
        test: /app\/scripts\/\.js$/,
        exclude: [/node_modules/],
        use: [{
          loader: 'babel-loader',
          options: { presets: ['es2015']},
        }],
      },
    ]
  },
  plugins: [
    new BrowserSyncPlugin({
      host: 'localhost',
      port: 3000,
      files: ["public/**"],
      server: { baseDir: ['public'] }
    })
  ]

}
