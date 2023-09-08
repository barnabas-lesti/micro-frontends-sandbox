const tsconfig = require('./tsconfig.json');
const moduleNameMapper = require('tsconfig-paths-jest')(tsconfig);

/** @type {import('jest').Config} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  roots: ['<rootDir>'], // The root directory of your tests
  testMatch: ['**/*.spec.ts'], // Pattern for test files
  moduleNameMapper,
};
