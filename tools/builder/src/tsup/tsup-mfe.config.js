const { defineBaseConfig } = require('./tsup-base.config');

module.exports = {
  /**
   * @param {import('tsup').Options | undefined} overrideOptions
   */
  defineMFEConfig(overrideOptions) {
    return defineBaseConfig({
      format: ['esm', 'iife'],
      ...(overrideOptions || {}),
    });
  },
};
