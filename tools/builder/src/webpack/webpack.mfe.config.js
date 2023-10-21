const path = require('path');

const { createWebpackBaseConfig } = require('./webpack.base.config');

function createWebpackMFEConfig() {
  const cwd = process.cwd();

  /** @type {import('webpack').Configuration} */
  const webpackMFEConfig = {
    ...createWebpackBaseConfig(),
    entry: {
      index: path.resolve(cwd, './src/index.ts'),
    },
    output: {
      path: path.resolve(cwd, './dist'),
      filename: '[name].js',
    },
  };

  return webpackMFEConfig;
}

module.exports = {
  createWebpackMFEConfig,
};
