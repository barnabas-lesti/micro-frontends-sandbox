const { defineBaseViteConfig } = require('@mfs/builder');

module.exports = defineBaseViteConfig({
  entry: ['./src/index.ts', './src/contract.ts'],
});
