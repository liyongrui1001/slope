/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2017-11-29 22:48:28
 * @version $Id$
 */

const webpack = require('webpack')
const resolve = require('path').resolve;
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
	entry: {
	  app: './index.js'
	},
	output: {
		filename: '[name].[hash].js',
		path: resolve(__dirname, 'build/')
	},
	module: {
    rules: [
    	{
        test: /\.js$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [resolve('src')],
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
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
  	new webpack.DefinePlugin({}),
    new webpack.ProvidePlugin({
      d3:'d3'
    }),
  	new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    })
  ],
  devtool: 'cheap-source-map'
}
