/* eslint-disable */
const HtmlWebPackPlugin = require('html-webpack-plugin')

module.exports = (env, argv) => ({
  target: 'electron-renderer',
  devtool: 'source-map',
  node: {
    __dirname: false,
    __filename: false
  },
  entry: './electron/printInjectReceipt.js',
  output: {
    path: __dirname + "/../build",
    filename: 'printInjectReceipt.js',
    publicPath: '../build/'
  },
  resolve: {
    modules: [
      'node_modules'
    ],
    symlinks: false
  },
  plugins: [
    new HtmlWebPackPlugin({
      hash: true,
      template: './public/print.html',
      filename: 'print.html'
    }),
  ]
})
