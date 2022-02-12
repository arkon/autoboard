const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

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
        use: 'babel-loader',
      },

      {
        test: /\.scss$/,
        include: helpers.root('src/styles'),
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    'autoprefixer',
                  ],
                ],
              },
            },
          },
          'sass-loader'
        ]
      }
    ],
  },

  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),

    new MiniCssExtractPlugin(),

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
  ]
};
