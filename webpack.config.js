var paths = require('./build/paths');
var webpack = require('webpack');
var nodeExternals = require('webpack-node-externals');


module.exports = {
    entry: './src/' + paths.packageName,
    externals: [nodeExternals()],
    target: 'node',

    output: {
        filename: paths.packageName + '.js',
        libraryTarget: 'umd',
        path: __dirname + '/' + paths.output
    },

    module: {
        rules: [
            {
                exclude: /node_modules/,
                loader: 'babel-loader',
                test: /.js?$/
            }
        ]
    },

    optimization: {
        minimize: true,
    }
};
