// // jest.config.js
module.exports = {
  preset: 'ts-jest',
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1',
  },
  moduleFileExtensions: ['js', 'json', 'ts'],
  roots: ['<rootDir>/src', '<rootDir>/test'],
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: [
    '**/*.(t|j)s',
    '!**/node_modules/**',
    '!**/src/entities/**',
    '!**/src/shared/infra/typeorm/migrations/**',
  ],
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
};
