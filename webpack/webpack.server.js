const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

const config = require('./webpack.dev');
const PORT = 3000;

new WebpackDevServer(webpack(config), {
  hot: true,
  historyApiFallback: true
}).listen(PORT, 'localhost', (err) => {
  if (err) {
    console.log(err);
    process.exit(0);
  }

  console.log(`Listening to http://localhost:${PORT}`);
});
