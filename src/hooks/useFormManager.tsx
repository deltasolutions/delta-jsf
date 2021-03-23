import Ajv from 'ajv';
import { useCallback, useLayoutEffect, useMemo, useState } from 'react';
import { Validity } from 'src/models';
import { FormManager } from 'src/models/FormManager';
import { FormManagerOptions } from 'src/models/FormManagerOptions';
import { clone, get, merge, set } from 'src/utils';
import { useMergeQueue } from './useMergeQueue';

const ajv = new Ajv();

export const useFormManager = <T, TOptions extends FormManagerOptions<T>>(
  options: TOptions
): TOptions extends { initialValue: T }
  ? FormManager<T>
  : FormManager<T | undefined> => {
  const { schema = {}, onValue, onValidity, onSubmit, initialValue } = options;

  const [value, setValue] = useState(initialValue);
  const [schemaValidity, setSchemaValidity] = useState<Validity>({});
  const [extensionValidity, extendValidity, wait] = useMergeQueue<Validity>({});

  const validity = useMemo(
    () => merge(clone(schemaValidity), clone(extensionValidity)),
    [schemaValidity, extensionValidity]
  );

  const [isSubmitted, setIsSubmitted] = useState(false);
  const isValid = useMemo(() => {
    const check = v =>
      !v ||
      typeof v !== 'object' ||
      Object.keys(v).reduce(
        (prev, curr) => prev && check(v[curr]),
        !Array.isArray(v.errors) || v.errors.length < 1
      );
    return check(validity);
  }, [validity]);

  const submit = useCallback(async () => {
    await wait();
    // TODO: remove type cast
    onSubmit?.(value as T);
    setIsSubmitted(true);
    return value;
  }, []);

  const validate = useMemo(() => {
    const validateViaAjv = ajv.compile<T>(schema);
    return (v: T) => {
      validateViaAjv(v);
      const e =
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
      setSchemaValidity(e);
    };
  }, [schema]);

  useLayoutEffect(() => {
    // TODO: remove type cast
    onValue?.(value as T);
  }, [value]);

  useLayoutEffect(() => {
    onValidity?.(validity);
  }, [validity]);

  return {
    options,

    value,
    setValue,
    validity,
    extendValidity,

    isValid,
    isSubmitted,

    wait,
    submit,
    validate
  } as any;
};
