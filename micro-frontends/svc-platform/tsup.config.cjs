const { defineMFEConfig } = require('@mfs/builder');

module.exports = defineMFEConfig({
  entry: ['./src/index.ts', './src/loader.ts'],
  outDir: './dist',
});
