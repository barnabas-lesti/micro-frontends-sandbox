const { defineConfig } = require('tsup');

module.exports = defineConfig({
  entry: ['./src/index.ts'],
  outDir: './dist',
  format: ['esm', 'cjs'],
  clean: false,
  dts: false,
  minify: false,
  sourcemap: false,
});
