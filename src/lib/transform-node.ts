import {Decorator, ObjectExpression, ObjectMethod, ObjectProperty, SpreadElement} from '@babel/types';
import {ParserOptions} from 'prettier';
import {SPREAD_ELEMENT} from './constants';
import {PluginOptions} from './types/plugin-options.type';

export function transformNode<
  T extends {
    decorators?: Decorator[];
  },
>(node: T, options: ParserOptions & PluginOptions): T {
  node.decorators?.forEach(decorator => prettifyDecorator(decorator, options));

  Object.keys(node).forEach(key => {
    if (key !== 'decorators') {
      const item = node[key as keyof T];
      if (item && typeof item === 'object') {
        transformNode(item, options);
      }
    }
  });

  return node;
}

function prettifyDecorator(decorator: Decorator, options: ParserOptions & PluginOptions): void {
  // console.log({decorator});
  if (decorator.expression.type === 'CallExpression') {
    if (decorator.expression.callee.type === 'Identifier') {
      if (decorator.expression.callee.name === 'Component') {
        const args = decorator.expression.arguments;
        const config = args[0] as ObjectExpression;
        if (config) {
          config.properties = orderProperties(config.properties, options.componentDecoratorOrder);
        }
      }
      if (decorator.expression.callee.name === 'Directive') {
        const args = decorator.expression.arguments;
        const config = args[0] as ObjectExpression;
        if (config) {
          config.properties = orderProperties(config.properties, options.directiveDecoratorOrder);
        }
      }
    }
  }
}

function orderProperties<T extends ObjectMethod | ObjectProperty | SpreadElement>(
  properties: T[],
  order: string[],
): T[] {
  const getOrder = (propName: string): number | undefined => {
    const o = order.indexOf(propName);
    return o === -1 ? undefined : o;
  };

  return [...properties].sort((a, b) => {
    const propertyA = a.type === 'SpreadElement' ? SPREAD_ELEMENT : 'name' in a.key ? a.key.name : undefined;
    const propertyB = b.type === 'SpreadElement' ? SPREAD_ELEMENT : 'name' in b.key ? b.key.name : undefined;

    const orderA = propertyA ? getOrder(propertyA) : undefined;
    const orderB = propertyB ? getOrder(propertyB) : undefined;

    if (orderA === undefined) {
      return orderB === undefined ? 0 : 1;
    }
    if (orderB === undefined) {
      return -1;
    }

    return orderA - orderB;
  });
}
