"use strict";
const path = require("path"),
      webpack = require("webpack"),
      ExtractTextPlugin = require("extract-text-webpack-plugin");

var sassLoader = new ExtractTextPlugin({ filename: "app.bundle.css" });

module.exports = {
  entry: {
    app: "./src/app.js"
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js"
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    port: 8078
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [{
          loader: "html-loader",
          options: {
            minimize: true
          }
        }]
      },
      {
        test: /\.scss$/,
        use: sassLoader.extract({
          use: [
            {
              loader: "css-loader",
              options: {
                sourceMap: true
              }
            },
            {
              loader: "sass-loader",
              options: {
                sourceMap: true
              }
            }
          ]
        })
      },
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      // assets
      {
        test: /\.(woff|woff2|ttf|eot|png|jpg|jpeg|gif|svg)$/,
        loader: 'file-loader?name=[path][name].[ext]'
      }
      /*{
        test: /\.js&/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["env"]
          }
        }
      }*/
    ]
  },
  plugins: [
    sassLoader
    // new webpack.optimize.UglifyJsPlugin()
  ],

  context: __dirname,
  target: "web",
  devtool: "source-map"
};