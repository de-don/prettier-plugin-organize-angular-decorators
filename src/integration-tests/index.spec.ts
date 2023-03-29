import {readdirSync, readFileSync} from 'fs';
import {join} from 'path';
import * as prettier from 'prettier';
import * as OrganizeAttributes from '../index';

const testFolder = join(__dirname, 'tests');
const configurations = readdirSync(testFolder);

configurations.forEach(configuration => {
  describe(configuration, () => {
    const configurationPath = join(testFolder, configuration);
    const tests = readdirSync(configurationPath);
    const extension = readFileSync(join(configurationPath, 'extension')).toString().trim();

    tests
      .filter(file => file !== 'extension')
      .forEach(test =>
        it(test, () => {
          const path = join(testFolder, configuration, test);
          const inputPath = join(path, `input.${extension}`);
          const expectedPath = join(path, `expected.${extension}`);

          const input = readFileSync(inputPath).toString();
          const expected = readFileSync(expectedPath).toString();
          const testConfig = JSON.parse(readFileSync(join(path, 'config.json')).toString());

          const options = {
            filepath: inputPath,
            ...testConfig,
            plugins: [OrganizeAttributes],
          };
          const prettify = (code: string) => prettier.format(code, options);

          const format = () => prettify(input);

          const expectedError = expected.match(/Error\("(?<message>.*)"\)/)?.groups?.message;

          if (expectedError) {
            expect(format).toThrow(expectedError);
          } else {
            expect(format()).toEqual(expected);
          }
        }),
      );
  });
});
