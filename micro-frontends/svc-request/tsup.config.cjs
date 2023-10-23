const { defineMFeTSUpConfig } = require('@mfs/builder');

module.exports = defineMFeTSUpConfig({
  entry: ['./src/index.ts', './src/loader.ts'],
  outDir: './dist',
});
