module.exports = {
  testEnvironment: 'jsdom',
  transform: { '\\.[jt]sx?$': 'babel-jest' },
  setupFilesAfterEnv: ['<rootDir>/src/config/jest/jestSetup.js'],
  testRegex: '(/tests/.*|(\\.|/)(test|spec))\\.jsx?$',
  moduleFileExtensions: ['js', 'jsx'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/src/config/jest/fileMock.js',
    '\\.(css|less)$': 'identity-obj-proxy',
    '@/(.*)': '<rootDir>/src/$1'
  },
  testPathIgnorePatterns: ['<rootDir>/node_modules/'],
  coverageDirectory: '<rootDir>/src/config/jest/coverage',
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{js,jsx}',
    '!<rootDir>/src/**/{main,index}.{js,jsx}',
    '!<rootDir>/src/config/jest/*.{js,jsx}',
    '!**/node_modules/**'
  ]
};
