const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = require('./webpack.base.config.js')({
  output: {
    publicPath: '/',
    filename: 'app.js',
  },
  babelQuery: {
    presets: ['es2015', 'react'],
    plugins: ['react-hot-loader/babel'],
  },
  sassLoader: 'style-loader!css!sass',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      hash: false,
      template: './src/index.html',
    }),
  ],
});