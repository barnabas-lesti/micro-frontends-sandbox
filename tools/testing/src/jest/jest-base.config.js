module.exports = {
  /** @type {import('jest').Config} */
  jestBaseConfig: {
    testEnvironment: 'jsdom',
    preset: 'ts-jest',

    collectCoverage: true,
    collectCoverageFrom: ['**/*.ts', '!**/*.d.ts', '!**/dist/**'],
    coverageProvider: 'v8',
  },
};
