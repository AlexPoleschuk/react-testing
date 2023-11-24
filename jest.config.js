/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  roots: ['src'],
  transform: {
    "^.+\\.m?[tj]s$": "ts-jest",
    ".+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2|svg)$": "jest-transform-stub"
  },
  transformIgnorePatterns: [
    '//node_modules'
  ],
  moduleNameMapper: {
    "src/(.*)": "<rootDir>/$1"
  }
};
