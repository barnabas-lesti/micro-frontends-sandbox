const path = require('path');

/** @type {import('webpack').Configuration} */
module.exports = {
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js',
  },
  mode: 'production',
  devtool: 'source-map',
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
/**
 * Resolve tsconfig.json paths to Webpack aliases
 * @return {object} - Webpack alias config
 */
function getTypescriptPathAliases() {
  const { compilerOptions } = require('./tsconfig.json');
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
