import Ajv from 'ajv';
import { Schema, Validity } from '../models';
import { get } from './get';
import { set } from './set';

const ajv = new Ajv({ strict: 'log', keywords: ['layout'] });

export const validateAgainstSchema = (schema: Schema, value: any): Validity => {
  const validateViaAjv = ajv.compile(schema);
  validateViaAjv(value);
  const validity =
    validateViaAjv.errors?.reduce((prev, curr) => {
      const path = curr.dataPath
        .replace(/\//g, '/properties/')
        .split('/')
        .map(v => v.replace(/~0/g, '~').replace(/~1/g, '/'))
        .slice(1);
      path.push('errors');
      const existingValue = get(prev, path) ?? [];
      set(prev, path, [...existingValue, curr.message]);
      return prev;
    }, {}) ?? {};
  return validity;
};
