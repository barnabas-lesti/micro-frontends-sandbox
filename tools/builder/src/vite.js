const { defineConfig } = require('vite');
const dts = require('vite-plugin-dts');

function defineMFEViteConfig() {
  return defineConfig({
    build: {
      lib: {
        entry: ['./src/index.ts', './src/loader.ts'],
        formats: ['cjs', 'es'],
      },
      minify: true,
      sourcemap: true,
    },
    plugins: [dts({ rollupTypes: true })],
  });
}

module.exports = {
  defineMFEViteConfig,
};
