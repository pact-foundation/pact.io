module.exports = {
	entry: [
		'themes/pact/src/js/script.js'
	],
	devtool: 'source-map',
	module: {
		rules: [
			{
				test: /\.json$/,
				loader: 'json-loader'
			}
		]
	},
	resolve: {
		extensions: ['.js']
	}
};