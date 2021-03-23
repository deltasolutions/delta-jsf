import { MergeFunction } from 'src/models';
import { isObject } from './guards';

const mergeTwoObjects = (target: any, source: any, fn?: MergeFunction) => {
  Object.keys(source).forEach((key: string) => {
    const targetValue = target[key];
    const sourceValue = source[key];
    const fnValue = fn?.(targetValue, sourceValue, key);
    if (targetValue !== undefined && fnValue !== undefined) {
      target[key] = fnValue;
    } else if (Array.isArray(targetValue) && Array.isArray(sourceValue)) {
      target[key] = targetValue.concat(sourceValue);
    } else if (isObject(targetValue) && isObject(sourceValue)) {
      target[key] = mergeTwoObjects(targetValue, sourceValue, fn);
    } else {
      target[key] = sourceValue;
    }
  });
  return target;
};

export const merge = (...args: any[]) => {
  const hasMergeFn = typeof args[args.length - 1] === 'function';
  const fn = hasMergeFn ? (args.pop() as MergeFunction) : undefined;
  const objects = args.filter(v => isObject(v));
  if (objects.length < 1) {
    return {};
  }
  const target = objects.shift();
  let source: any;
  while (target && (source = objects.shift())) {
    mergeTwoObjects(target, source, fn);
  }
  return target;
};
