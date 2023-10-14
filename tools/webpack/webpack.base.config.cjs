const path = require('path');

function createWebpackBaseConfig() {
  /** @type {import('webpack').Configuration} */
  const baseWebpackConfig = {
    mode: 'production',
    module: {
      rules: [
        {
          test: /\.m?js/,
          resolve: {
            fullySpecified: false,
          },
        },
        {
          test: /\.ts/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'ts-loader',
              options: {
                configFile: path.resolve(process.cwd(), './tsconfig.json'),
              },
            },
          ],
        },
      ],
    },
    resolve: {
      extensions: ['.js', '.ts'],
      alias: getTypescriptPathAliases(),
    },
  };
  return baseWebpackConfig;
}

/**
 * Resolve tsconfig.json paths to Webpack aliases
 * @return {object} - Webpack alias config
 */
function getTypescriptPathAliases() {
  const { compilerOptions } = require(path.resolve(process.cwd(), 'tsconfig.json'));
  if (!compilerOptions) {
    return {};
  }

  const { paths } = compilerOptions;
  const aliases = {};

  Object.keys(paths || {}).forEach((item) => {
    const key = item.replace('/*', '');
    const value = path.resolve('./', paths[item][0].replace('/*', '').replace('*', ''));
    aliases[key] = value;
  });

  return aliases;
}

module.exports = {
  createWebpackBaseConfig,
};
