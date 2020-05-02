var webpack = require('webpack');
var path = require('path');
var BundleTracker = require('webpack-bundle-tracker');

module.exports = {
	mode: 'development',
	context: __dirname,
	entry: './js/index',
	output: {
		path: path.resolve('./static'),
		filename: "bundle.js",
	},
	plugins: [
		new BundleTracker({filename: './webpack-stats.json'}),
	],
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				query: {
					presets: ['react', 'es2015']
				}
			}
		]
	},
	resolve: {
		extensions: ['*', '.js', '.jsx']
	}
};
