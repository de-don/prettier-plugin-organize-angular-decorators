import type {InitialOptionsTsJest} from 'ts-jest';

const config: InitialOptionsTsJest = {
  preset: 'ts-jest/presets/js-with-ts-esm',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(ts|js|html)$': ['ts-jest', {
      tsconfig: {
        allowJs: true,
      },
      useESM: true,
    }],
  },
  clearMocks: true,
  resetModules: true,
  reporters: ['default'],
  coverageReporters: ['html', 'cobertura', 'text-summary', 'json-summary'],
  coverageDirectory: 'artifacts/coverage',
  transformIgnorePatterns: [
    'node_modules/(?!.*\\.mjs$|uuid)',
  ],
};
export default config;
