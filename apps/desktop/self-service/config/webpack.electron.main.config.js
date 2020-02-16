/* eslint-disable */
const path = require('path')
const Dotenv = require('dotenv-webpack')

module.exports = (env, argv) => ({
  target: 'electron-main',
  devtool: 'source-map',
  node: {
    __dirname: false,
    __filename: false
  },
  entry: './electron/electron-main.js',
  output: {
    path: __dirname + '/../',
    filename: 'main.js',
    // chunkFilename: 'main.js'
  },
  resolve: {
    modules: [
      'node_modules'
    ],
    symlinks: false
  },
  plugins: [
    new Dotenv({
      path: path.resolve(__dirname, `../electron-builder.env`),
      systemvars: true
    })
  ]
})
