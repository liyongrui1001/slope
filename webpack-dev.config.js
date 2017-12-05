/**
 * 
 * @authors hgcoder (you@example.org)
 * @date    2017-12-04 21:57:07
 * @version $Id$
 */

const webpack = require('webpack');
const webpackConfig = require('./webpack.config');
const merge = require('webpack-merge')

module.exports = merge({
  devtool: false,
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: true,
    hot: true,
    host: 'localhost',
    port: '8882',
    open: false,
    overlay: true,
    publicPath: '/',
    quiet: true
  },
  plugins: [
  	new webpack.HotModuleReplacementPlugin()
  ]
}, webpackConfig);
