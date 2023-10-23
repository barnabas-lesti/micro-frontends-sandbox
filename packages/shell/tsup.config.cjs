const { defineBaseTSUpConfig } = require('@mfs/builder');

module.exports = defineBaseTSUpConfig({
  entry: ['./src/index.ts'],
  outDir: './dist',
});
