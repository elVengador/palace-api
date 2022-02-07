const path = require('path');
const NodemonPlugin = require('nodemon-webpack-plugin')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// filename: "[name].[contenthash].js",

module.exports = {
    entry: { index: path.resolve(__dirname, "src", "index.js") },
    mode: 'production',
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "[name].js",
        publicPath: "",
    },
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
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    }
}