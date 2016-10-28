const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OfflinePlugin = require('offline-plugin');

module.exports = require('./webpack.base.config.js')({
  output: {
    filename: 'app.[hash].js',
    path: path.resolve(process.cwd(), 'dist')
  },
  babelQuery: {
    presets: ['es2015', 'react'],
    plugins: ['transform-class-properties']
  },
  sassLoader: ExtractTextPlugin.extract({
    fallbackLoader: 'style',
    loader: 'css!sass'
  }),
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: 'production'
      }
    }),
    new ExtractTextPlugin('style.[hash].css'),
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
        minifyURLs: true
      },
      inject: true
    }),
    new OfflinePlugin({
      publicPath: '/',
      relativePaths: false,
      safeToUseOptionalCaches: true,
      AppCache: false
    })
  ]
});
