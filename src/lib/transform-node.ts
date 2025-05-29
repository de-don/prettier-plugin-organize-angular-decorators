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

function prettifyDecorator(
  decorator: Decorator,
  options: ParserOptions & PluginOptions,
): void {
  const {expression} = decorator;
  if (expression.type !== 'CallExpression' || expression.callee.type !== 'Identifier') {
    return;
  }

  const orders: Record<string, string[]> = {
    Component: options.componentDecoratorOrder,
    Directive: options.directiveDecoratorOrder,
  };

  const order = orders[expression.callee.name];
  if (!order) {
    return;
  }

  const config = expression.arguments[0] as ObjectExpression | undefined;
  if (config) {
    config.properties = orderProperties(config.properties, order);
  }
}

function orderProperties<T extends ObjectMethod | ObjectProperty | SpreadElement>(
  properties: T[],
  order: string[],
): T[] {
  const orderMap = new Map(order.map((name, i) => [name, i]));

  return [...properties].sort((a, b) => {
    const getName = (p: typeof a): string | undefined =>
      p.type === 'SpreadElement' ? SPREAD_ELEMENT : 'name' in p.key ? p.key.name : undefined;

    const propertyA = getName(a);
    const propertyB = getName(b);

    const orderA = propertyA ? orderMap.get(propertyA) : undefined;
    const orderB = propertyB ? orderMap.get(propertyB) : undefined;

    if (orderA === undefined) {
      return orderB === undefined ? 0 : 1;
    }
    if (orderB === undefined) {
      return -1;
    }

    return orderA - orderB;
  });
}
