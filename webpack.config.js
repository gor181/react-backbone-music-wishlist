var path = require('path');
var webpack = require('webpack');
var resolve = function (dir) {
    return path.join(__dirname, dir);
};

module.exports = {
  devtool: 'eval',
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './src/index'
  ],
  output: {
    path: resolve('dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
      loaders: [
          {
              test: /\.jsx?$/, 
              loaders: ['react-hot', 'babel?presets[]=react,presets[]=es2015,presets[]=stage-0,presets[]=stage-2'],
              include: resolve('src'),
              exclude: /node_modules/
          },
          { test: /\.css$/, loader: 'style-loader!css-loader' },
          { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file" },
          { test: /\.(woff|woff2)$/, loader:"url?prefix=font/&limit=5000" },
          { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream" },
          { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml" }
      ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.css']
  }
};
