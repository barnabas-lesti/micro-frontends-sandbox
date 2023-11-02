function defineBaseJestConfig() {
  /** @type {import('jest').Config} */
  const jestBaseConfig = {
    testEnvironment: 'jsdom',
    preset: 'ts-jest',

    collectCoverage: true,
    collectCoverageFrom: ['**/*.ts', '!**/*.d.ts', '!**/dist/**'],
    coverageProvider: 'v8',
  };
  return jestBaseConfig;
}

module.exports = {
  defineBaseJestConfig,
};
