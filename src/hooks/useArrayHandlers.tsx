import { useCallback, useMemo } from 'react';
import { Schema, TemplateProps } from 'src/models';

export const useArrayHandlers = (props: TemplateProps) => {
  const {
    value,
    onValue,
    schema: { maxItems, minItems, additionalItems } = {} as Schema
  } = props ?? {};

  const mayDelete = useMemo(() => (value?.length ?? 0) > (minItems ?? 0), [
    value,
    minItems
  ]);

  const handleDelete = useCallback(
    (itemIdex: number): void =>
      onValue?.(value?.filter((d, i) => i !== itemIdex) ?? []),
    [onValue, value]
  );

  // https://json-schema.org/understanding-json-schema/reference/array.html#addtional-items
  // additionalItems in default true
  const mayAdd = useMemo(
    () =>
      (value?.length ?? 0) < (maxItems ?? Infinity) &&
      additionalItems !== false,
    [value, maxItems, additionalItems]
  );

  const handleAdd = useCallback(
    (): void => onValue?.(Array.isArray(value) ? [...value, null] : [null]),
    [onValue, value]
  );

  return {
    handleDelete: mayDelete ? handleDelete : undefined,
    handleAdd: mayAdd ? handleAdd : undefined
  };
};
