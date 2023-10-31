const { defineConfig } = require('vite');
const dts = require('vite-plugin-dts');

function defineMFeViteConfig() {
  return defineConfig({
    build: {
      emptyOutDir: false,
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
  defineMFeViteConfig,
};
