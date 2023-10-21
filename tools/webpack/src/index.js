const { createWebpackAppConfig } = require('./webpack.app.config');
const { createWebpackMFEConfig } = require('./webpack.mfe.config');

module.exports = {
  createWebpackAppConfig,
  createWebpackMFEConfig,
};
