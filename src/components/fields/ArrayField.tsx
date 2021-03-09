import React from 'react';
import { FieldProps, Schema } from 'src/models';
import { clone, getFieldComponent, merge } from 'src/utils';

//     items?: JSONSchema7Definition | JSONSchema7Definition[];
//     additionalItems?: JSONSchema7Definition;
//     maxItems?: number;
//     minItems?: number;
//     uniqueItems?: boolean;
//     contains?: JSONSchema7;

export const ArrayField = (props: FieldProps) => {
  const {
    schema,
    layout,
    registry: {
      templates: { ArrayTemplate, PanicTemplate }
    },
    value: values,
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

  return (
    <ArrayTemplate {...props}>
      {values?.map((value, index) => {
        const sub = {
          index,
          ...props,
          schema: (items ?? {}) as Schema,
          layout,
          validity,
          value,
          onValue: v => {
            const copy = [...values];
            copy[index] = v;
            onValue?.(copy);
          },
          onValidity: e => {
            // onValidity?.(
            //   merge(
            //     clone(validity),
            //     { properties: { [index]: e } },
            //     (a, b, k) => (k === 'messages' ? b : undefined)
            //   )
            // );
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
