const { webpackConfigFactory } = require('../../tools/webpack');

module.exports = webpackConfigFactory({
  entry: './src/index.ts',
});
