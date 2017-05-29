const path = require('path');
const webpack = require('webpack');

module.exports = {
  // context is the __dirname is the folder where this file lives
  context: path.resolve(__dirname, './src'),
  entry: {
    app: ['./index.js']
  },
  output: {
    path: path.resolve(__dirname, './assets/js'),
    filename: '[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/,
        loaders: [
          'style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            // options: {
            //   includePaths: [
            //       path.resolve(__dirname, './src')
            //   ]
            // }
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      }
    ]
  },
  // resolve: {
  //   modules: [path.resolve(__dirname, './src'), 'node_modules']
  // },
};