import {Parser, ParserOptions} from 'prettier';
import {transformNode} from './transform-node';
import {PluginOptions} from './types/plugin-options.type';

export function wrapParser(parser: Parser): Parser {
  return {
    ...parser,
    parse: (text, parsers, options) => {
      const parsedNode = parser.parse(text, parsers, options);
      return transformNode(parsedNode, options as ParserOptions & PluginOptions);
    },
  };
}
