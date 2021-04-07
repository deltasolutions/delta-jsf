import React, { useCallback, useLayoutEffect, useMemo, useState } from 'react';
import { defaults } from 'src/defaults';
import { Validity } from 'src/models';
import { FormManager } from 'src/models/FormManager';
import { FormManagerOptions } from 'src/models/FormManagerOptions';
import { clone, merge } from 'src/utils';
import { useMergeQueue } from './useMergeQueue';

export const useFormManager = <T, TOptions extends FormManagerOptions<T>>(
  options: TOptions
): TOptions extends { initialValue: T }
  ? FormManager<T>
  : FormManager<T | undefined> => {
  const {
    initialValue,
    schema = {},
    onValue,
    onValidity,
    onSubmit,
    registry = defaults.registry
  } = options;
  const {
    utils: { validateAgainstSchema }
  } = registry;

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

  // TODO:
  // Add ability to defer validation to different events,
  // so the `validate` function splits into `validateAgainstSchema`
  // (already in registry) for usage inside `onValue` and `flushValidity`
  // to be used either in `onValue` or in `onSubmit`.
  const validate = useCallback(
    (value: T) => {
      const validity = validateAgainstSchema(schema, value);
      setSchemaValidity(validity);
    },
    [schema]
  );

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
