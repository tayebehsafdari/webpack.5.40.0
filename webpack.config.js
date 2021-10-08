const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HelloWorldPlugin = require('./plugins/HelloWorldPlugin');
const webpack = require('webpack');
const ESLintPlugin = require('eslint-webpack-plugin');


// console.log('__dirname: ', __dirname);

const config = {
    // entry: './src/index.js',
    entry: {
        admin: './src/admin.js',
        home: './src/home.js'
    },
    output: {
        // filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        // publicPath: 'dist/',
        clean: true
    },
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    },
    // stats: 'errors-only',
    stats: {
        assets: false
    },
    module: {
        rules: [
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'images/[hash][ext][query]'
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'fonts/[hash][ext][query]'
                }
            },
            {
                test: /\.m?js$/i,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Output Management index',
            template: 'index.html',
            filename: 'index.html',
            chunks: ['home', 'vendors~home~admin']
        }),
        new HtmlWebpackPlugin({
            title: 'Output Management admin',
            template: 'index.html',
            filename: 'admin.html',
            chunks: ['admin', 'vendors~admin~home']
        }),
        new HelloWorldPlugin({
            options: true,
            name: "Tayebeh Safdari"
        }),
        new webpack.ProgressPlugin(),
        new ESLintPlugin()
    ]
};

module.exports = (env, {mode}) => {
    // console.log("env: ", env);
    // console.log("argv: ", argv);
    let isDevelopment = mode === 'development';
    if (isDevelopment) {
        config.output.filename = '[name].bundle.js';
        config.devServer = {
            contentBase: path.join(__dirname, 'dist'),
            index: 'index.html',
            port: 9000
        };
    }
    if (!isDevelopment) {
        config.output.filename = '[name].[contenthash].bundle.js';
        config.plugins.push(
            new MiniCssExtractPlugin({
                filename: '[name].[contenthash].css'
            })
        );
    }
    config.module.rules.push(...[
        {
            test: /\.css$/i,
            // use: ['style-loader', 'css-loader'],
            use: [isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader']
        },
        {
            test: /\.s[ac]ss$/i,
            // use: ['style-loader', 'css-loader', 'sass-loader'],
            use: [isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
        }
    ]);
    return config;
};