import React from 'react';
import { FieldProps, Schema } from 'src/models';
import { clone, getFieldComponent, merge } from 'src/utils';

export const ArrayField = (props: FieldProps) => {
  const {
    schema,
    layout,
    registry: {
      templates: { ArrayTemplate, PanicTemplate }
    },
    value,
    validity,
    onValue,
    onValidity
  } = props;

  const { items } = schema ?? {};

  if (Array.isArray(items)) {
    return (
      <PanicTemplate {...props}>
        Can`t set property 'items' an array
      </PanicTemplate>
    );
  }

  const values = Array.isArray(value) && !!value ? value : [];

  return (
    <ArrayTemplate {...props}>
      {values?.map((value, index) => {
        const sub = {
          index,
          ...props,
          schema: (items ?? {}) as Schema,
          layout,
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
                k === 'messages' ? b : undefined
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
        return <Component {...sub} key={`array-item-${index ** 2}`} />;
      })}
    </ArrayTemplate>
  );
};
