const path = require('path');
const NodemonPlugin = require('nodemon-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

// const {
//     NODE_ENV = 'production',
// } = process.env;

const {
    NODE_ENV = 'development',
} = process.env;

module.exports = {
    entry: { index: path.resolve(__dirname, "src", "index.js") },
    mode: NODE_ENV,
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