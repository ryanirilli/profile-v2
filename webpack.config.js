const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = function(env) {
  return {
    entry: {
      main: './src/index.js',
      vendor: ['react', 'react-dom', 'immutable', 'gsap']
    },
    output: {
      filename: '[chunkhash].[name].js',
      path: path.resolve('./dist')
    },
    module: {
      rules: [{
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: ['css-loader', 'sass-loader']
        })
      }]
    },
    devtool: "source-map",
    devServer: {
      historyApiFallback: true
    },
    plugins: [
      new webpack.optimize.CommonsChunkPlugin({names: ['vendor', 'manifest']}),
      new CleanWebpackPlugin(['dist']),
      new HtmlWebpackPlugin({template: '!!handlebars-loader!src/index.hbs'}),
      new ExtractTextPlugin('./styles-[contenthash].css')
    ]
  }
};