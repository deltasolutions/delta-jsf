import { useCallback, useLayoutEffect, useMemo, useState } from 'react';
import { defaults } from '../components';
import { Validity } from '../models';
import { FormManager, FormManagerOptions } from '../models';
import { clone, merge } from '../utils';
import { useDereferencedOptions } from './useDereferencedOptions';
import { useMergeQueue } from './useMergeQueue';

export const useFormManager = <T, TOptions extends FormManagerOptions<T>>(
  options: TOptions
): TOptions extends { initialValue: T }
  ? FormManager<T>
  : FormManager<T | undefined> => {
  const dereferencedOptions = useDereferencedOptions(options);
  const {
    schema,
    initialValue,
    onValue,
    onValidity,
    onSubmit,
    registry = defaults.registry
  } = dereferencedOptions;

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
  }, [value]);

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
    options: dereferencedOptions,
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
