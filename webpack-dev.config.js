/**
 * 
 * @authors hgcoder (you@example.org)
 * @date    2017-12-04 21:57:07
 * @version $Id$
 */

const webpack = require('webpack')
const webpackConfig = require('./webpack.config')
const merge = require('webpack-merge')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const notifier = require('node-notifier')
const portfinder = require('portfinder')
let webpackDevCof = merge(webpackConfig, {
	devtool: 'cheap-source-map',
	devServer: {
		clientLogLevel: 'warning',
		historyApiFallback: true,
		hot: true,
		host: 'localhost',
		open: false,
		overlay: true,
		publicPath: '/',
		port: '8810',
		quiet: true
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin()
	]
})
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
          messages: [`服务启动成功: http://location:${port}`],
        },
        onErrors: _onErrors()
      }))
      resolve(webpackDevCof)
    }
  })
})
return 
// new Promise((resolve, reject) => {
			portfinder.getPort((err, port) => {
				if (err) {
					reject(err)
				} else {
					webpackDevCof.devServer.port = port
					webpackDevCof.plugins.push(new FriendlyErrorsPlugin({
						compilationSuccessInfo: {
							messages: [`服务启动: http://localhost:${port}`],
						},
						onErrors: _onErrors()
					}))
				}
				resolve(webpackDevCof)
			})