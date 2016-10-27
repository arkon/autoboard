var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack/webpack.dev.config');
var PORT = 3000;

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true,
}).listen(PORT, 'localhost', (error) => {
  if (error) {
    console.log(error);
    process.exit(0);
  }
  console.log(`Listening to http://localhost:${PORT}`);
});
