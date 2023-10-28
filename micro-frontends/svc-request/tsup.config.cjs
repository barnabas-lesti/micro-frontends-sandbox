const { defineMFeTSUPConfig } = require('@mfs/builder');

module.exports = defineMFeTSUPConfig({
  entry: ['./src/index.ts', './src/loader.ts'],
  outDir: './dist',
});
