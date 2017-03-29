var path = require('path')
var webpack = require('webpack')

module.exports = {
  entry: './client/index.js',
  output: {
    path: __dirname + '/client/dist',
    filename: "bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        query: {
          presets: ["es2015", "react"],
          plugins: ["transform-class-properties"]
        }
      }
    ]
  }
}
