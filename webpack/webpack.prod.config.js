var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: [
    './src/script.js'
  ],
  output: {
    path: path.resolve(process.cwd(), 'dist'),
    filename: 'app.[hash].js',
  },
  devtool: 'eval',
  module: {
    loaders:[{
      test: /\.js$/,
      include: path.resolve(process.cwd(), 'src'),
      loader: 'babel-loader',
      query: {
        presets: ['es2015', 'stage-0', 'react'],
      },
    }, {
      test: /\.scss$/,
      exclude: /node_modules/,
      loader: ExtractTextPlugin.extract({
        fallbackLoader: 'style-loader',
        loader: 'css!sass?indentedSyntax=true&sourceMap=true',
      }),
    }],
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new ExtractTextPlugin('style.css'),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
      inject: true,
    }),
  ]
}