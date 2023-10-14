const path = require('path');
const { createWebpackBaseConfig } = require('./webpack.base.config.cjs');

function createWebpackAppConfig() {
  const cwd = process.cwd();

  /** @type {import('webpack').Configuration} */
  const webpackMFEConfig = {
    ...createWebpackBaseConfig(),
    entry: {
      bundle: path.resolve(cwd, './src/index.ts'),
    },
    output: {
      path: path.resolve(cwd, './dist'),
      filename: '[name].js',
    },
    devServer: {
      static: ['public', ...getStaticMicroFrontendFolders()],
    },
  };

  return webpackMFEConfig;
}

function getStaticMicroFrontendFolders() {
  const cwd = process.cwd();
  const packageJSON = require(path.resolve(cwd, './package.json'));
  const allDependencies = { ...packageJSON.dependencies, ...packageJSON.devDependencies };
  const nodeModulesPath = path.resolve(cwd, './node_modules');
  const staticFolders = [];

  for (const dependency in allDependencies) {
    if (dependency.startsWith('@mfs') && dependency.includes('-mfe')) {
      const mfeName = dependency.replace('@mfs/', '');
      const mfePath = path.resolve(nodeModulesPath, dependency);
      staticFolders.push({
        directory: mfePath,
        publicPath: `/micro-frontends/${mfeName}`,
      });
    }
  }

  return staticFolders;
}

module.exports = {
  createWebpackAppConfig,
};
