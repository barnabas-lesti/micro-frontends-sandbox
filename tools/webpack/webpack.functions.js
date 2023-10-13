const { resolve } = require('path');

/**
 * Resolve tsconfig.json paths to Webpack aliases
 * @return {object} - Webpack alias config
 */
function getTypescriptPathAliases() {
  const { compilerOptions } = require(resolve(process.cwd(), 'tsconfig.json'));
  if (!compilerOptions) {
    return {};
  }

  const { paths } = compilerOptions;
  const aliases = {};

  Object.keys(paths || {}).forEach((item) => {
    const key = item.replace('/*', '');
    const value = resolve('./', paths[item][0].replace('/*', '').replace('*', ''));
    aliases[key] = value;
  });

  return aliases;
}

module.exports = {
  getTypescriptPathAliases,
};
