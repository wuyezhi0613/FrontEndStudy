

const isProduction = false
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = {
    mode: isProduction ? 'production' : 'development',
    entry: {
        app: './src/index.tsx'
    },
    output: {
        filename: "js/[name]_bundle.js",
        path: path.resolve(__dirname, "./public/dist/"),
        publicPath: '/dist/'
    },
    devtool: isProduction ? false : "cheap-module-eval-source-map",
    devServer: {
        contentBase: path.resolve(__dirname, "./public"),
        compress: true,
        host: 'localhost',
        port: 9000,
        publicPath: '/dist/',
        hot: true,
        inline: true,
        historyApiFallback: true,
        noInfo: false,
        overlay: {
            warnings: true,
            errors: true
        }
    },
    resolve: {
        extensions: ["config.js", ".ts", ".tsx", ".js", ".json"]
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "awesome-typescript-loader"
            },
            {
                enforce: "pre",
                test: /\.js$/,
                use: [
                    "babel-loader",
                    // "source-map-loader"
                ],
                exclude: [
                    // path.resolve(path.join(__dirname, 'node_modules/cesium'))
                ]
            },
            {
                test: /\.css$/,
                use: [
                    { loader: 'style-loader' },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            },
            {
                test: /\.less$/i,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader", options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: "less-loader", options: {
                            sourceMap: true
                        }
                    }]
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg|eot|ttf|gif|woff|ico|cur)$/,
                use: 'url-loader?limit=1500&name=images/[hash:6].[ext]'
            },
            // {
            //     test: /\.woff$/,
            //     use: "url-loader?limit=10000&name=dist/fa/[hash].[ext]&mimetype=application/font-woff"
            // },
            // {
            //     test: /\.(ttf|eot|svg)$/,
            //     use: "file-loader?name=dist/fa/[hash].[ext]"
            // }
        ]
    },
    target: 'web',
    plugins: [
        // extractLess
        // new CleanWebpackPlugin('./public/dist'),
        // new HtmlWebpackPlugin({
        //     title: 'Summit Web',
        //     chunks: ['./dist/js/app_bundle'],
        //     filename: './public/index.html',
        //     template: './public/index.html'
        // }),
    ].concat(!isProduction ? [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin()   
    ] : [])
}