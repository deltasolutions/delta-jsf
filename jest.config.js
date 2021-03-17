module.exports = {
  clearMocks: true,
  moduleNameMapper: {
    '\\.(svg|png|pcss|jpg)$': '<rootDir>/src/tests/stub.ts',
    '^storybook/(.*)$': '<rootDir>/storybook/$1',
    '^src/(.*)$': '<rootDir>/src/$1',
  },
  verbose: true,
  setupFilesAfterEnv: ['<rootDir>/src/tests/setup.ts']
};
