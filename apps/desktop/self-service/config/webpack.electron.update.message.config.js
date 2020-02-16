/* eslint-disable */
const HtmlWebPackPlugin = require('html-webpack-plugin')

module.exports = (env, argv) => ({
  target: 'electron-renderer',
  devtool: 'source-map',
  node: {
    __dirname: false,
    __filename: false
  },
  entry: './electron/updateInjectMessage.js',
  output: {
    path: __dirname + "/../build",
    filename: 'updateInjectMessage.js',
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
      template: './public/update.html',
      filename: 'update.html'
    }),
  ]
})
