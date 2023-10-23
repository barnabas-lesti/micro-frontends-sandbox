const { defineBaseTSUpConfig } = require('./tsup-base.config');

module.exports = {
  /**
   * @param {import('tsup').Options | undefined} overrideOptions
   */
  defineMFeTSUpConfig(overrideOptions) {
    return defineBaseTSUpConfig({
      format: ['esm', 'iife'],
      ...(overrideOptions || {}),
    });
  },
};
