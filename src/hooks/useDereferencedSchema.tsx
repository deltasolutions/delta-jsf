import RefParser from 'json-schema-ref-parser';
import { useCallback, useEffect, useState } from 'react';
import { FormManagerOptions, Schema } from 'src/models';
import { hash } from 'src/utils';

export const useDereferencedSchema = <T extends any>(
  options: FormManagerOptions<T>
): FormManagerOptions<T> => {
  const { schema, layout, ...rest } = options;

  const [derefSchema, setDerefSchema] = useState<Schema | undefined>();

  const updateSchema = useCallback(async (data: any) => {
    const res = await RefParser.dereference(data);
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
