module.exports = {
  testEnvironment: 'jest-environment-node',
  moduleFileExtensions: [
    'js',
    'mjs'
  ],
  transform: {
    '^.+\\.js$': 'babel-jest',
    '^.+\\.mjs$': 'babel-jest'
  },
}
