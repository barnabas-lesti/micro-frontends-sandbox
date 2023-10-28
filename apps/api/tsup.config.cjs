const { defineNodeTSUpConfig } = require('@mfs/builder');

module.exports = defineNodeTSUpConfig({
  entry: ['./src/index.ts'],
  outDir: './dist',
});
