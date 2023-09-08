const { webpackConfigFactory } = require('../../webpack.config.cjs');

module.exports = webpackConfigFactory({
  entry: './src/index.ts',
});
