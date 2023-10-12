const { webpackConfigFactory } = require('@mfs-tools/webpack');

module.exports = webpackConfigFactory({
  entry: './src/index.ts',
});
