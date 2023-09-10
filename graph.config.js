/* eslint-disable max-len */

/** @type {import('dependency-cruiser').IConfiguration} */
module.exports = {
  options: {
    doNotFollow: {
      path: 'node_modules',
    },
    exclude: {
      path: [
        // File extensions (but keeping them from node_modules)
        '^(?!.*\\/node_modules(\\/|$))(?!^node_modules\\/).*\\.(js|cjs|d\\.ts)$',
        // Test files
        '\\.spec|\\.test|\\.mock|\\.e2e|\\.stories',
        // Models and types
        // '\\.type|\\.model',
      ],
      dynamic: true,
    },
    // includeOnly: '\\.service',
    // focus: '\\.service',
    tsPreCompilationDeps: true,
    // extraExtensionsToScan: [".json", ".jpg", ".png", ".svg", ".webp"],
    // combinedDependencies: true,
    // preserveSymlinks: false,
    // moduleSystems: ['es6', 'tsd'],
    tsConfig: {
      fileName: 'tsconfig.base.json',
    },
    // webpackConfig: {
    //  fileName: 'webpack.config.js',
    //  env: {},
    //  arguments: {}
    // },
    // babelConfig: {
    //   fileName: '.babelrc',
    // },
    // exoticRequireStrings: [],
    prefix: 'https://github.com/barnabas-lesti/web3-rxjs-sandbox/blob/main/',
    enhancedResolveOptions: {
      exportsFields: ['exports'],
      conditionNames: ['import', 'require', 'node', 'default'],
      mainFields: ['main', 'types', 'typings'],
    },
    reporterOptions: {
      dot: {
        collapsePattern: 'node_modules/(@[^/]+/[^/]+|[^/]+)',
        theme: {
          graph: {
            splines: false,
          },
        },
      },
      archi: {
        collapsePattern: 'node_modules/(@[^/]+/[^/]+|[^/]+)',
        theme: {
          graph: {
            splines: 'ortho',
            rankdir: 'TD',
          },
        },
      },
      text: {
        highlightFocused: true,
      },
    },
  },
};
