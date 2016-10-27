var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: [
    './src/script.js'
  ],
  output: {
    path: path.resolve(process.cwd(), 'dist'),
    publicPath: '/',
    filename: 'app.js',
  },
  devtool: 'eval',
  module: {
    loaders:[{
      test: /\.js$/,
      include: path.resolve(process.cwd(), 'src'),
      loader: 'babel-loader',
      query: {
        presets: ['es2015', 'react'],
        plugins: ['react-hot-loader/babel'],
      },
    }, {
      test: /\.scss$/,
      exclude: /node_modules/,
      loaders: ['style', 'css', 'sass'],
    }],
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      hash: false,
      template: './src/index.html',
    }),
  ]
}