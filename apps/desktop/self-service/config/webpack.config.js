/* eslint-disable */
const autoprefixer = require('autoprefixer')
const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const Dotenv = require('dotenv-webpack')
const SimpleProgressWebpackPlugin = require( 'simple-progress-webpack-plugin' )

module.exports = (env, argv) => ({
  target: 'electron-renderer',
  entry: {
    main: './src/index.js'
  },
  output: {
    path: __dirname + "/../build",
    filename: '[name].js',
    chunkFilename: '[name].js',
    publicPath: '/'
  },
  resolve: {
    modules: [
      'node_modules',
    ],
    symlinks: false,
  },
  watchOptions: {
    poll: true
  },
  devServer: {
    noInfo: true,
    port: 3001,
    open: true,
    publicPath: '',
    historyApiFallback: true // allow BrowserRouter
  },
  plugins: [
    new SimpleProgressWebpackPlugin({
      format: 'compact'
    }),
    new HtmlWebPackPlugin({
      hash: true,
      template: './public/index.html',
      filename: 'index.html'
    }),
    new Dotenv({
      path: path.resolve(__dirname, `../.env.${ argv.mode }`),
      systemvars: true
    })
  ],
  module: {
    rules: [
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader'
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules\/(?!@syntesis)/,
        use: {
          loader: require.resolve('babel-loader'),
          options: {
            rootMode: 'upward'
          }
        },
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {}
          }
        ]
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: { minimize: true },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          require.resolve('style-loader'),
          {
            loader: require.resolve('css-loader'),
            options: {
              importLoaders: 1,
            },
          },
          {
            loader: require.resolve('postcss-loader'),
            options: {
              // Necessary for external CSS imports to work
              // https://github.com/facebookincubator/create-react-app/issues/2677
              ident: 'postcss',
              plugins: () => [
                require('postcss-flexbugs-fixes'),
                autoprefixer({
                  browsers: [
                    '>1%',
                    'last 4 versions',
                    'Firefox ESR',
                    'not ie < 9', // React doesn't support IE8 anyway
                  ],
                  flexbox: 'no-2009',
                }),
              ],
            },
          },
        ],
      }
    ],
  },
  optimization: {
    splitChunks: {
      name: true,
      chunks: 'all',
    }
  }
})
