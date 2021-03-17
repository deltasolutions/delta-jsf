module.exports = {
  clearMocks: true,
  moduleNameMapper: {
    '\\.(svg|png|pcss|jpg)$': '<rootDir>/src/tests/stub.ts',
  },
  verbose: true,
  setupFilesAfterEnv: ['<rootDir>/src/tests/setup.ts']
};
