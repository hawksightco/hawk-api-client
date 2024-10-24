/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  // Enable the coverage report
  collectCoverage: true,

  // Specify the directories/files to include for coverage
  collectCoverageFrom: ['src/**/*.ts'], // Adjust the path based on your source files

  // Define the output format of the coverage report
  coverageReporters: ['json', 'lcov', 'text', 'clover'], // You can specify more formats if needed

  // Optionally, specify where the coverage reports should be saved
  coverageDirectory: 'coverage',

  // Optionally, specify the threshold for failing tests if coverage falls below certain limits
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },

  // Other Jest settings can go here...
  preset: 'ts-jest',
  testEnvironment: 'node',
  testPathIgnorePatterns: [
    "/dist/"
  ]
};