'use strict';

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
    rules: [{ test: /\.tsx?$/, loader: 'awesome-typescript-loader' }],
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
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'sass-loader' },
        ],
      },
      {
        test: /\.(png|jpg)$/,
        use: [{ loader: 'url-loader' }],
      },
    ],
  },
};

module.exports = [tsEntry, sassEntry];
