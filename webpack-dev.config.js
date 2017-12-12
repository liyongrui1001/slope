/**
 * 
 * @authors hgcoder (you@example.org)
 * @date    2017-12-04 21:57:07
 * @version $Id$
 */

const webpack = require('webpack')
const webpackConfig = require('./webpack.config')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const resolve = require('path').resolve;
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const notifier = require('node-notifier')
const portfinder = require('portfinder')
let webpackDevCof = {
	entry: {
		slope: './index.js',
		test: './test/index.js'
	},
	output: {
		filename: '[name].[hash].js',
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
	devtool: 'source-map',
	devServer: {
		clientLogLevel: 'warning',
		historyApiFallback: true,
		hot: true,
		host: 'localhost',
		open: false,
		overlay: true,
		publicPath: '/',
		quiet: true
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    })
	]
}
const _onErrors = function() {
	return (severity, errors) => {
		if (severity !== 'error') {
			return
		}
		const error = errors[0]
		const filename = error.file.split('!').pop()
		notifier.notify({
			title: 'charts',
			message: severity + ': ' + error.name,
			subtitle: filename || '',
			// icon: path.join(__dirname, 'logo.png')
		})
	}
}
module.exports = new Promise((resolve, reject) => {
	portfinder.getPort((err, port) => {
		if (err) {
			reject(err)
		} else {
			webpackDevCof.devServer.port = port
			// Add FriendlyErrorsPlugin
			webpackDevCof.plugins.push(new FriendlyErrorsPlugin({
				compilationSuccessInfo: {
					messages: [`服务启动成功: http://localhost:${port}`],
				},
				onErrors: _onErrors()
			}))
			resolve(webpackDevCof)
		}
	})
})