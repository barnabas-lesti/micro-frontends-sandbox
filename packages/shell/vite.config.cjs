const { defineBaseViteConfig } = require('@mfs/builder/vite');

module.exports = defineBaseViteConfig({
  entry: ['./src/index.ts', './src/contract.ts'],
});
