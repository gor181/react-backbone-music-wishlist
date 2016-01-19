var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');

const PORT = 3000;

new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot: true,
    historyApiFallback: true
}).listen(PORT, 'localhost', function (err, result) {
    console.log(err || 'Listening at localhost: ' + PORT);
});
