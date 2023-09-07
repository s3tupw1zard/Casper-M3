const path = require('path');

module.exports = {
	mode: 'development', // Set the mode to 'development'
	entry: {
		main: "./src/index.jsx",
	},
	resolve: {
		alias: {
			'@components': path.resolve(__dirname, 'src/components'),
		},
		extensions: ['.js', '.jsx'],
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/env', '@babel/preset-react']
					}
				}
			},
			{
				test: /\.css$/,
				use: ["style-loader", "css-loader"],
			},
			{
				test: /\.scss$/,
				use: ["style-loader", "css-loader", "sass-loader"],
			},
		],
	},
	output: {
		filename: "[name].bundle.js",
		path: path.resolve(__dirname, "assets/built"),
	},
};
