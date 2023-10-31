const { defineNodeTSUPConfig } = require('@mfs/builder');

module.exports = defineNodeTSUPConfig({
  entry: ['./src/index.ts'],
  outDir: './dist',
});
