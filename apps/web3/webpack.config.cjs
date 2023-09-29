const { webpackConfigFactory } = require('../../webpack.config.js');

module.exports = webpackConfigFactory({
  entry: './src/index.ts',
});
