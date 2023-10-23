module.exports = {
  /** @type {import('jest').Config} */
  jestBaseConfig: {
    testEnvironment: 'jsdom',
    preset: 'ts-jest',

    collectCoverage: true,
    collectCoverageFrom: ['**/*.ts'],
    coverageProvider: 'v8',
    coverageThreshold: {
      global: {
        branches: 90,
        functions: 90,
        lines: 90,
        statements: 90,
      },
    },
  },
};
