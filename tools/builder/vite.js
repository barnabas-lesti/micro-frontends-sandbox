const { defineConfig } = require('vite');
const dts = require('vite-plugin-dts');

/**
 * @typedef {Object} OverrideConfig
 * @property {string[]} entry
 * @property {boolean} minify
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
      minify: overrideConfig?.minify || false,
    },
    plugins: [dts()],
  });
}

function defineMFEServiceViteConfig() {
  return defineBaseViteConfig({
    entry: ['./src/service-loader.ts', './src/contract.ts'],
    minify: true,
  });
}

module.exports = {
  defineBaseViteConfig,
  defineMFEServiceViteConfig,
};
