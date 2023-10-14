const path = require('path');
const { createWebpackBaseConfig } = require('./webpack.base.config.cjs');

function createWebpackMFEConfig() {
  const cwd = process.cwd();

  /** @type {import('webpack').Configuration} */
  const webpackMFEConfig = {
    ...createWebpackBaseConfig(),
    entry: {
      loader: path.resolve(cwd, './src/loader.ts'),
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
