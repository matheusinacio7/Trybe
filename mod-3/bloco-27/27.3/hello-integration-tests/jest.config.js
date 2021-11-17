const config = {
  extensionsToTreatAsEsm: [".ts"],
  coverageDirectory: '<rootDir>/__coverage__',
  moduleNameMapper: {
    "@test/helpers": "<rootDir>/__tests__/helpers",
    "@test/config/(.*)": "<rootDir>/__tests__/config/$1",
    "@controllers": ["<rootDir>/src/controllers"],
    "@crypto": ["<rootDir>/src/services/crypto"],
    "@errors": ["<rootDir>/src/errors"],
    "@middlewares": ["<rootDir>/src/middlewares"],
    "@models": ["<rootDir>/src/models"],
    "@routers": ["<rootDir>/src/routers"],
    "@token": ["<rootDir>/src/services/token"],
    "@utils": ["<rootDir>/src/utils"],
    "@validation": ["<rootDir>/src/services/validation"],
  },
  roots: ['<rootDir>/src', '<rootDir>/__tests__'],
  testMatch: ["**/__tests__/**/*.spec.ts"],
  verbose: true,
};

module.exports = config;
