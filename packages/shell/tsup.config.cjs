const { defineBaseConfig } = require('@mfs/builder');

module.exports = defineBaseConfig({
  entry: ['./src/index.ts'],
  outDir: './dist',
});
