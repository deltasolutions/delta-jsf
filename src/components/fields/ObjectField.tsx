import React, { useLayoutEffect } from 'react';
import { FieldProps, Schema } from 'src/models';
import {
  clone,
  getConditionals,
  getFieldComponent,
  getProperties,
  merge
} from 'src/utils';

export const ObjectField = (props: FieldProps) => {
  const {
    schema,
    layout,
    registry: {
      templates: { ObjectTemplate, PanicTemplate }
    },
    value,
    validity,
    onValue,
    onValidity
  } = props;

  const { order } = layout ?? {};
  const properties = getProperties(schema) ?? {};
  const conditionals = getConditionals(schema, value) ?? {};
  const availables = { ...properties, ...conditionals };

  const availableKeys = new Set(Object.keys(availables));
  const keys = (order ?? [])
    .reduce((prev, curr) => {
      if (availableKeys.has(curr)) {
        prev.push(curr);
        availableKeys.delete(curr);
        return prev;
      }
      return prev;
    }, [] as string[])
    .concat(Array.from(availableKeys));

  useLayoutEffect(() => {
    // An object without values from removed fields.
    const filtered = { ...value };
    const availableKeys = new Set(Object.keys(availables));
    let hasToUpdate = false;
    Object.keys(value ?? {}).forEach(k => {
      if (!availableKeys.has(k)) {
        filtered[k] = undefined;
        hasToUpdate = true;
      }
    });
    if (hasToUpdate) {
      onValue?.(filtered);
    }
  }, [keys.join()]);

  return (
    <ObjectTemplate {...props}>
      {keys.map(key => {
        const sub = {
          key,
          ...props,
          // Forcing a cast here but checking after.
          schema: availables?.[key] as Schema,
          layout: layout?.properties?.[key],
          value: value?.[key],
          validity: validity?.properties?.[key],
          onValue: v => onValue?.(merge(clone(value), { [key]: v })),
          onValidity: e =>
            onValidity?.(
              merge(clone(validity), { properties: { [key]: e } }, (a, b, k) =>
                k === 'messages' ? b : undefined
              )
            )
        };
        if (typeof sub.schema !== 'object') {
          return (
            <PanicTemplate {...sub}>
              Object properties must be a valid JSONSchema.
            </PanicTemplate>
          );
        }
        const Component = getFieldComponent(sub);
        return <Component {...sub} />;
      })}
    </ObjectTemplate>
  );
};
