import { useCallback, useEffect, useState } from 'react';
import { FormManagerOptions, Schema } from 'src/models';
import { dereference as defaultDereference, hash } from 'src/utils';

export const useDereferencedSchema = <T extends any>(
  options: FormManagerOptions<T>
): FormManagerOptions<T> => {
  const { schema, layout, dereference = defaultDereference, ...rest } = options;

  const [derefSchema, setDerefSchema] = useState<Schema | undefined>();

  const updateSchema = useCallback(async (data: any) => {
    const res = await dereference(data);
    setDerefSchema(res as any);
  }, []);

  useEffect(() => {
    if (!schema) return;
    updateSchema(schema);
  }, [hash(schema)]);

  return {
    ...rest,
    schema: derefSchema ?? { type: 'null' },
    layout: derefSchema ? layout : undefined
  };
};
