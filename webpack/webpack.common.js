const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const helpers = require('./helpers');

module.exports = {
  entry: [
    helpers.root('src/scripts/index.js')
  ],

  output: {
    path: helpers.root('dist'),
    filename: '[name].[hash].js'
  },

  resolve: {
    extensions: ['.js', '.scss', '.html']
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        include: helpers.root('src/scripts'),
        loader: 'babel-loader'
      },

      {
        test: /\.scss$/,
        include: helpers.root('src/styles'),
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                'sourceMap': true,
                'importLoaders': 1
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: () => [
                  autoprefixer
                ]
              }
            },
            'sass-loader'
          ]
        })
      }
    ],
  },

  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),

    new HtmlWebpackPlugin({
      template: helpers.root('src/public/index.html'),
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      },
      inject: true
    }),

    new ExtractTextPlugin({
      filename: '[name].[hash].css'
    })
  ]
};
