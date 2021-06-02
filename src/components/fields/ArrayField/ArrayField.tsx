import React from 'react';
import { useDefaults } from 'src/hooks';
import { FieldProps, Schema } from 'src/models';
import { clone, getFieldComponent, merge } from 'src/utils';

export function ArrayField(props: FieldProps) {
  const {
    schema,
    layout,
    registry: {
      templates: { ArrayTemplate, PanicTemplate }
    },
    value: fieldValues,
    validity,
    onValue,
    onValidity
  } = props;

  const { items } = schema ?? {};

  useDefaults(props);

  if (Array.isArray(items)) {
    return (
      <PanicTemplate {...props}>
        Incorrect value in 'schema.items' — must be a object.
      </PanicTemplate>
    );
  }

  const values = Array.isArray(fieldValues) ? fieldValues : [];

  return (
    <ArrayTemplate {...props}>
      {values?.map((value, index) => {
        const sub: FieldProps<any> = {
          ...props,
          schema: (items ?? {}) as Schema,
          layout: layout?.items,
          value,
          onValue: v => {
            const copy = [...values];
            copy[index] = v;
            onValue?.(copy);
          },
          validity: validity?.items?.[index],
          onValidity: e => {
            const items = new Array(values.length).fill(null);
            if (values.length - 1 >= index) {
              items[index] = e;
            }
            onValidity?.(
              merge(clone(validity), { items }, (a, b, k) =>
                k === 'errors' ? b : undefined
              )
            );
          }
        };
        if (typeof sub.schema !== 'object') {
          return (
            <PanicTemplate {...sub}>
              Object properties must be a valid JSONSchema
            </PanicTemplate>
          );
        }
        const Component = getFieldComponent(sub);
        return <Component {...sub} key={`array-item-${index}`} />;
      })}
    </ArrayTemplate>
  );
}
