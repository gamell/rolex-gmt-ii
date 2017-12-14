const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './src/app.js',
  output: {
    path: path.resolve(__dirname, 'bin'),
    filename: 'app.bundle.js'
  },
  module: {
    loaders: [
      { test: /\.pug$/, loader: 'pug-loader' },
      { test: /\.png$/, loader: 'file-loader' },
      { test: /\.scss$/, loaders: ['style-loader', 'css-loader', 'sass-loader']},
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
  ],
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.js'
    }
  }
};
