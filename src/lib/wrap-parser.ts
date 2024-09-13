import {Parser, ParserOptions} from 'prettier';
import {transformNode} from './transform-node';
import {PluginOptions} from './types/plugin-options.type';
import {checkFilePath} from './check-file-path';

export function wrapParser(parser: Parser): Parser {
  return {
    ...parser,
    parse: (text, opts) => {
      const options = opts as ParserOptions & PluginOptions;
      const parsedNode = parser.parse(text, options);

      if (!checkFilePath(options.filepath, options.angularOrganizePatterns)) {
        return parsedNode;
      }

      return transformNode(parsedNode, options);
    },
  };
}
