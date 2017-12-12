/**
 * 
 * @authors hgcoder (you@example.org)
 * @version $Id$
 */

const webpack = require('webpack')
const resolve = require('path').resolve;

const CompressionWebpackPlugin = require('compression-webpack-plugin')
process.env.NODE_ENV = 'production'
module.exports = {
  entry: {
    slope: './index.js',
    test: './test/index.js'
  },
  output: {
    filename: '[name].min.js',
    path: resolve(__dirname, 'build/')
  },
  module: {
    rules: [
      // {
      //    test: /\.js$/,
      //    loader: 'eslint-loader',
      //    enforce: 'pre',
      //    include: [resolve('src')],
      //    options: {
      //      formatter: require('eslint-friendly-formatter')
      //    }
      //  },
      {
        test: /\.js$/,
        // exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            babelrc: false,
            plugins: [
              'transform-remove-strict-mode'
            ],
            presets: [
              [
                'es2015', {
                  loose: true,
                  modules: false
                }
              ],
              'stage-0'
            ]
          }
        }
      }
    ]
  },
  plugins: [
    // 静态资源压缩
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      sourceMap: false,
      parallel: true
    }),
    // 去除重复引用
    new webpack.DefinePlugin({
      'process.env': {
          NODE_ENV: '"production"'
        }
    })
  ],
  devtool: false
}