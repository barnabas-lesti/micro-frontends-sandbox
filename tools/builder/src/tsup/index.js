const { defineConfig } = require('tsup');

function defineBaseTSUPConfig() {
  return defineConfig({
    entry: ['./src/index.ts'],
    outDir: './dist',
    format: ['esm', 'cjs'],
    clean: false,
    dts: false,
    minify: false,
    sourcemap: false,
  });
}

module.exports = {
  defineBaseTSUPConfig,
};
