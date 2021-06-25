import { useCallback, useEffect, useState } from 'react';
import { FormManagerOptions, Schema } from '../models';
import { dereference as dereferenceByDefault, hash } from '../utils';

export const useDereferencedOptions = <T extends any>(
  options: FormManagerOptions<T>
): FormManagerOptions<T> => {
  const [schema, setSchema] = useState<Schema>({ type: 'null' });
  const updateSchema = useCallback(
    async (withRefs: Schema) => {
      const dereference = options.dereference ?? dereferenceByDefault;
      const withoutRefs = await dereference(withRefs);
      setSchema(withoutRefs);
    },
    [options.dereference]
  );
  useEffect(() => {
    updateSchema(options.schema);
  }, [hash(options.schema)]);
  return { ...options, schema };
};
