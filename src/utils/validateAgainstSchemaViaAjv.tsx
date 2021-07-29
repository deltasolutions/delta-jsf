import Ajv, { ErrorObject as AjvError } from 'ajv';
import { ValidateAgainstSchemaOptions, Validity } from '../models';
import { get } from './get';
import { set } from './set';

const ajv = new Ajv({ strict: 'log', allErrors: true, keywords: ['layout'] });

export interface ValidateAgainstSchemaViaAjvOptions
  extends ValidateAgainstSchemaOptions {
  transformAjvErrors?: (errors: AjvError[]) => AjvError[];
}

export const validateAgainstSchemaViaAjv = ({
  schema,
  value,
  transformAjvErrors
}: ValidateAgainstSchemaViaAjvOptions): Validity => {
  const validateViaAjv = ajv.compile(schema);
  validateViaAjv(value);
  const ajvErrors =
    transformAjvErrors?.(validateViaAjv.errors ?? []) ??
    validateViaAjv.errors ??
    [];
  const validity =
    ajvErrors.reduce((prev, curr) => {
      const path = curr.dataPath
        .replace(/\/(\D)/g, '/properties/$1')
        .replace(/\/(\d)/g, '/items/$1')
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
