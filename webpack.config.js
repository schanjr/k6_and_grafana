var path = require('path');
var webpack = require('webpack');
const regeneratorRuntime = require("regenerator-runtime");

module.exports = {
  mode: "production",
  entry: {run: ['babel-polyfill', './src/run.js'], test: ['babel-polyfill', './src/test.js']},
  output: {
    path: path.resolve(__dirname, 'build'),
    libraryTarget: "commonjs",
    filename: '[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
      }
    ]
  },
  stats: {
    colors: true
  },
  target: "node",
  externals: /k6(\/.*)?/,
  devtool: 'source-map'
};
