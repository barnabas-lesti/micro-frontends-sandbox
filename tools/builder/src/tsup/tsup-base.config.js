const { defineConfig } = require('tsup');

module.exports = {
  /**
   * @param {import('tsup').Options | undefined} overrideOptions
   */
  defineBaseTSUpConfig(overrideOptions) {
    return defineConfig({
      format: ['esm'],
      clean: false,
      dts: true,
      minify: true,
      sourcemap: true,
      ...(overrideOptions || {}),
    });
  },
};
