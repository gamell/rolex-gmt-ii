const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/app.js',
  output: {
    path: './bin',
    filename: 'app.bundle.js'
  },
  module: {
    loaders: [
      { test: /\.pug$/, loader: 'pug' },
      { test: /\.png$/, loader: "url-loader" },
      { test: /\.scss$/, loaders: ['style', 'css', 'sass']},
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
      output: {
        comments: false,
      },
    }),
    new HtmlWebpackPlugin({
      template: 'src/templates/index.pug',
      filename: 'rolex.html'
    })
  ]
};
