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
var isDev = true
var hasValue = function(item) {
	return item != null;
};
let webpackDevCof = {
	entry: {
		slopeUi: './slope-ui/App.js',
		slope: './index.js',
	},
	output: {
		filename: '[name].min.js',
		path: resolve(__dirname, 'build/')
	},
	module: {
		rules: [{
				test: /\.(js|jsx)$/,
				include: resolve(__dirname, 'slope-ui'),
				loader: 'babel-loader',
				options: {
					plugins: [
						"transform-decorators-legacy",
						//  按需加载 样式文件
						["import", { "libraryName": "antd", "libraryDirectory": "es", "style": "css" }] 
					],
					presets: ["react","stage-0","es2015"],
					compact: true
				}
			}, {
				test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
				loader: 'url-loader',
				options: {
					limit: 10000,
					name: 'static/img/[name].[hash:8].[ext]',
				}
			}, {
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			}, {
				test: /\.less$/,
				use: [
					'style-loader', {
						loader: 'css-loader',
						options: {
							importLoaders: 1
						}
					}, {
						loader: 'less-loader',
						options: {
							strictMath: true,
							noIeCompat: true
						}
					}
				]
			}

		]
	},
	devtool: 'source-map',
	devServer: {
		clientLogLevel: 'warning',
		historyApiFallback: true,
		hot: true,
		host: '0.0.0.0',
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