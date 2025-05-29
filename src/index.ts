import {parsers as typescriptParsers} from 'prettier/plugins/typescript';
import {PluginOptions} from './lib/types/plugin-options.type';
import {wrapParser} from './lib/wrap-parser';

export const parsers = {
  typescript: wrapParser(typescriptParsers.typescript),
};

export const options: {
  [K in keyof PluginOptions]: any;
} = {
  componentDecoratorOrder: {
    type: 'string',
    category: 'Global',
    array: true,
    description: 'Order of attributes in Component decorator.',
    default: [{value: []}],
  },
  directiveDecoratorOrder: {
    type: 'string',
    category: 'Global',
    array: true,
    description: 'Order of attributes in Directive decorator.',
    default: [{value: []}],
  },
  pipeDecoratorOrder: {
    type: 'string',
    category: 'Global',
    array: true,
    description: 'Order of attributes in Pipe decorator.',
    default: [{value: []}],
  },
  injectableDecoratorOrder: {
    type: 'string',
    category: 'Global',
    array: true,
    description: 'Order of attributes in Injectable decorator.',
    default: [{value: []}],
  },
  moduleDecoratorOrder: {
    type: 'string',
    category: 'Global',
    array: true,
    description: 'Order of attributes in NgModule decorator.',
    default: [{value: []}],
  },
  angularOrganizePatterns: {
    type: 'string',
    category: 'Global',
    array: true,
    description: 'Optional list of globe patterns to apply the plugin.',
    default: [{value: []}],
  },
};
