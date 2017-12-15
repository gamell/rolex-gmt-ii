const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');

const extractSass = new ExtractTextPlugin({
    filename: "[name].[contenthash].css"
});

const pathsToClean = [
  'bin'
]

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
      { test: /\.css$/, loader: 'file-loader' },
      { test: /\.scss$/, use: extractSass.extract({
        use: [{
          loader: 'css-loader'
        },{
          loader: 'sass-loader'
        }],
        fallback: 'style-loader'
      })
    }]
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
      filename: 'rolex.html',
      css: ["style.css"]
    }),
    new CleanWebpackPlugin(pathsToClean),
    extractSass
  ],
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.js'
    }
  }
};
