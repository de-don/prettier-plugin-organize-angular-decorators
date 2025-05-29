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

  Object.entries(node).forEach(([key, value]) => {
    if (key === 'decorators') {
      return;
    }

    if (Array.isArray(value)) {
      value.forEach(v => {
        if (v && typeof v === 'object') {
          transformNode(v as any, options);
        }
      });
      return;
    }

    if (value && typeof value === 'object') {
      transformNode(value as any, options);
    }
  });

  return node;
}

function prettifyDecorator(decorator: Decorator, options: ParserOptions & PluginOptions): void {
  if (decorator.expression.type !== 'CallExpression' || decorator.expression.callee.type !== 'Identifier') {
    return;
  }

  const decoratorName = decorator.expression.callee.name;
  const args = decorator.expression.arguments;
  const config = args[0] as ObjectExpression | undefined;

  if (!config) {
    return;
  }

  const orderMap: Record<string, string[]> = {
    Component: options.componentDecoratorOrder,
    Directive: options.directiveDecoratorOrder,
  };

  const order = orderMap[decoratorName];

  if (order) {
    config.properties = orderProperties(config.properties, order);
  }
}

function orderProperties<T extends ObjectMethod | ObjectProperty | SpreadElement>(
  properties: T[],
  order: string[],
): T[] {
  if (order.length === 0) {
    return properties;
  }

  const orderMap = new Map<string, number>();
  order.forEach((name, idx) => orderMap.set(name, idx));

  const getOrder = (propName: string): number | undefined => orderMap.get(propName);

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
