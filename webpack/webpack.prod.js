const webpack = require('webpack');
const { merge } = require('webpack-merge');
const OfflinePlugin = require('@lcdp/offline-plugin');

const commonConfig = require('./webpack.common');

module.exports = merge(commonConfig, {
  mode: 'production',

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),

    new OfflinePlugin({
      publicPath: '/crcmaker/',
      relativePaths: false,
      safeToUseOptionalCaches: true,
      AppCache: false
    })
  ]
});
