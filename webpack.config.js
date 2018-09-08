const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    entry: ['./src/index.js'],


    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js'
    },
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    },
    devServer: {
        contentBase: './dist'
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/pages/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: "min.css",
        }),
        new CopyWebpackPlugin([
            {
                from: 'src/static',
                to: 'static'
            }
        ]),
        new webpack.LoaderOptionsPlugin({
            debug: true
        }),
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                        {
                            loader: "babel-loader",
                            options: {
                                presets: ['es2015','react']
                            }
                        }
                    ]
            },
            {
                test: /\.(css|scss)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            minimize: {
                                safe: true
                            }
                        }
                        },
                    {
                        loader: "sass-loader",
                        options: {
                            minimize: {
                                safe: true
                            }

                        }
                    }
                ]
            }
        ],

    }
};
