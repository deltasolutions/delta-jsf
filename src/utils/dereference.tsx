import { Schema } from 'src/models';
import { get } from './get';

export const dereference = (schema: Schema, root?: Schema): Schema =>
  Object.entries(schema).reduce((acc, [key, value]) => {
    if (key === '$ref' && typeof value === 'string' && value.startsWith('#')) {
      const { $ref, ...rest } = acc;
      return {
        ...rest,
        ...get(root ?? {}, value.replace('#/', '').split('/'), value)
      };
    }
    if (typeof value === 'object') {
      acc[key] = dereference(value, root ?? schema);
    }
    return acc;
  }, schema);
