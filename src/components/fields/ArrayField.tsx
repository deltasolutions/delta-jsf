import React from 'react';
import { useDefaults } from '../../hooks';
import { FieldProps, Schema } from '../../models';
import { clone, getFieldComponent, merge } from '../../utils';

export function ArrayField(props: FieldProps) {
  useDefaults(props);

  const {
    schema: { items },
    registry: {
      templates: { ArrayTemplate, PanicTemplate }
    },
    value: fieldValues,
    validity,
    onValue,
    onValidity
  } = props;

  if (Array.isArray(items)) {
    return (
      <PanicTemplate {...props}>
        Incorrect value in 'schema.items' — must be an object.
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
