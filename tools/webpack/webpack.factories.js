const path = require('path');
const { getTypescriptPathAliases } = require('./webpack.functions');

function webpackConfigFactory({ entry }) {
  return {
    entry,
    devtool: 'inline-source-map',
    module: {
      rules: [
        {
          test: /\.m?js/,
          resolve: {
            fullySpecified: false,
          },
        },
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
      alias: getTypescriptPathAliases(),
    },
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
  };
}

module.exports = {
  webpackConfigFactory,
};
