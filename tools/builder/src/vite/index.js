const { defineConfig } = require('vite');
const dts = require('vite-plugin-dts');

/**
 * @typedef {Object} OverrideConfig
 * @property {string[]} entry
 */

/**
 * @param {OverrideConfig | undefined} overrideConfig
 */
function defineBaseViteConfig(overrideConfig) {
  return defineConfig({
    build: {
      lib: {
        entry: overrideConfig?.entry || ['./src/index.ts'],
        formats: ['cjs', 'es'],
      },
      outDir: './dist',
      emptyOutDir: false,
      sourcemap: true,
      // minify: true,
    },
    plugins: [dts()],
    // plugins: [dts({ rollupTypes: true })],
  });
}

function defineMFeViteConfig() {
  return defineBaseViteConfig({
    entry: ['./src/index.ts', './src/contract.ts'],
  });
}

module.exports = {
  defineBaseViteConfig,
  defineMFeViteConfig,
};
