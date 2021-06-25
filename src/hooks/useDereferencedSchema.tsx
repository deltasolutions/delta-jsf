import { useEffect, useMemo, useState } from 'react';
import { FormManagerOptions, Schema } from '../models';
import { dereference as dereferenceByDefault, hash } from '../utils';

export const useDereferencedSchema = <T extends any>(
  options: FormManagerOptions<T>
): FormManagerOptions<T> => {
  const [schema, setSchema] = useState<Schema>({ type: 'null' });
  const dereference = useMemo(
    () => options.dereference ?? dereferenceByDefault,
    [options.dereference]
  );
  useEffect(() => {
    dereference(options.schema).then(r => setSchema(r));
  }, [hash(options.schema)]);
  return { ...options, schema };
};
