const { defineBaseTSUPConfig } = require('@mfs/builder');

module.exports = defineBaseTSUPConfig({
  entry: ['./src/index.ts'],
  outDir: './dist',
});
