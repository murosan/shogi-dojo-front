'use strict';
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const enabledSourceMap = process.env.ENVIRONMENT === 'production';

const tsEntry = {
  entry: {
    shogi: `${__dirname}/src/components/pages/Shogi`,
  },
  output: {
    filename: '[name].bundle.js',
    path: `${__dirname}/dist/js`,
  },
  resolve: { extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'] },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader',
        options: {
          sourceMap: enabledSourceMap,
        },
      },
    ],
  },
};

const sassEntry = {
  entry: {
    dojo: `${__dirname}/sass/dojo/dojo.scss`,
    shogi: `${__dirname}/sass/shogi/shogi.scss`,
  },
  output: {
    filename: '[name].css',
    path: `${__dirname}/dist/css`,
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                url: false,
                sourceMap: enabledSourceMap,
                importLoaders: 2,
              },
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: enabledSourceMap,
              },
            },
          ],
          fallback: { loader: 'style-loader' },
        }),
      },
      {
        test: /\.(png|jpg)$/,
        use: [{ loader: 'url-loader' }],
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin({
      filename: '[name].css',
    }),
  ],
};

module.exports = [tsEntry, sassEntry];
