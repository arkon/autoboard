const path = require('path');
const webpack = require('webpack');

module.exports = (options) => ({
  entry: [
    './src/script.js',
  ],
  devtool: 'eval',
  output: Object.assign({
    path: path.resolve(process.cwd()),
  }, options.output),
  module: {
    loaders: [{
      test: /\.js$/,
      include: path.resolve(process.cwd(), 'src'),
      loader: 'babel-loader',
      query: options.babelQuery,
    }, {
      test: /\.scss$/,
      exclude: /node_modules/,
      loader: options.sassLoader,
    }],
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
  ].concat(options.plugins),
});