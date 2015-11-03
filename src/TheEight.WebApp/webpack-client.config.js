var webpack = require('webpack');
var baseConfig = require('./webpack-base.config.js');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var config = Object.create(baseConfig);

config.entry = {
    'boat-lineup-planner': './client/app/boat-lineup-planner/main.js',
    //'erg-result-submitter': './client/app/erg-result-submitter/main.js'
};

config.plugins.push(
    new ExtractTextPlugin('wwwroot/styles/app.css', { allChunks: true }),
    new webpack.optimize.CommonsChunkPlugin('./wwwroot/app/client-common.js')
);

config.module.loaders.unshift({
    test: /\.scss$/,
    exclude: /node_modules/,
    loader: ExtractTextPlugin.extract('css!sass')
});

config.output = {
    filename: './wwwroot/app/[name].js'
};

module.exports = config;