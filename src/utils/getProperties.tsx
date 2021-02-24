import { Schema } from 'src/models';
import { clone } from './clone';
import { merge } from './merge';

export const getProperties = (schema: Schema): Schema['properties'] => {
  return [schema, ...(schema.allOf ?? [])].reduce((prev, curr) => {
    if (typeof curr === 'object' && typeof curr.properties === 'object') {
      merge(prev, clone(curr.properties));
    }
    return prev;
  }, {} as Schema['properties']);
};
