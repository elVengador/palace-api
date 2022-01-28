const path = require('path');
const NodemonPlugin = require('nodemon-webpack-plugin')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    entry: { index: path.resolve(__dirname, "src", "index.js") },
    mode: 'development',
    target: 'node',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js'],
        alias: {
            graphql$: path.resolve(__dirname, './node_modules/graphql/index.js'),
        },
    },
    plugins: [
        new NodemonPlugin(),
        // new BundleAnalyzerPlugin()
    ],
    devtool: 'inline-source-map',
    optimization: {
        minimize: false
    },

}