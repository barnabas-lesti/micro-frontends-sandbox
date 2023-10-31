const { defineConfig } = require('tsup');

/**
 * @param {import('tsup').Options | undefined} overrideOptions
 */
function defineBaseTSUPConfig(overrideOptions) {
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
function defineMFeTSUPConfig(overrideOptions) {
  return defineBaseTSUPConfig({
    noExternal: [/(.*)/],
    ...(overrideOptions || {}),
  });
}

/**
 * @param {import('tsup').Options | undefined} overrideOptions
 */
function defineNodeTSUPConfig(overrideOptions) {
  return defineBaseTSUPConfig({
    dts: false,
    minify: false,
    sourcemap: false,
    ...(overrideOptions || {}),
  });
}

module.exports = {
  defineBaseTSUPConfig,
  defineMFeTSUPConfig,
  defineNodeTSUPConfig,
};
