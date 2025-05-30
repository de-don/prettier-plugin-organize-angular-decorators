import type {JestConfigWithTsJest} from 'ts-jest';

const config: JestConfigWithTsJest = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(ts|js|html)$': ['ts-jest', {
      tsconfig: {
        allowJs: true,
      },
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
