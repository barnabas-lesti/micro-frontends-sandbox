const { defineConfig } = require('tsup');

/**
 * @param {import('tsup').Options | undefined} overrideOptions
 */
function defineBaseTSUpConfig(overrideOptions) {
  return defineConfig({
    format: ['esm', 'cjs'],
    clean: false,
    dts: true,
    minify: true,
    sourcemap: true,
    ...(overrideOptions || {}),
  });
}

/**
 * @param {import('tsup').Options | undefined} overrideOptions
 */
function defineMFeTSUpConfig(overrideOptions) {
  return defineBaseTSUpConfig({
    format: ['esm', 'cjs', 'iife'],
    ...(overrideOptions || {}),
  });
}

/**
 * @param {import('tsup').Options | undefined} overrideOptions
 */
function defineNodeTSUpConfig(overrideOptions) {
  return defineBaseTSUpConfig({
    format: ['cjs', 'esm'],
    dts: false,
    minify: false,
    sourcemap: false,
    ...(overrideOptions || {}),
  });
}

module.exports = {
  defineBaseTSUpConfig,
  defineMFeTSUpConfig,
  defineNodeTSUpConfig,
};
