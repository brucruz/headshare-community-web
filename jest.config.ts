export default {
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1',
  },
  transform: {
    '^.+\\.tsx?$': 'babel-jest',
    // '^.+\\.svg$': 'jest-svg-transformer',
  },
  setupFiles: ['./src/test/setupTest.js'],
  // setupFilesAfterEnv: ['<rootDir>/src/config/setupTests.ts'],
  // moduleFileExtensions: ['json', 'js', 'ts'],
};
