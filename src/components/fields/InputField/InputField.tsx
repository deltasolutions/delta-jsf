import React from 'react';
import { useDefaults } from 'src/hooks';
import { FieldProps } from 'src/models';

export function InputField(props: FieldProps) {
  const {
    schema,
    value,
    onValue,
    registry: {
      templates: { PrimitiveTemplate, PanicTemplate }
    }
  } = props;

  useDefaults(props);

  const type =
    typeof schema.type === 'string' &&
    {
      string: 'text',
      number: 'number',
      integer: 'number'
    }[schema.type];

  if (!type) {
    return <PanicTemplate {...props}>Invalid schema type</PanicTemplate>;
  }

  const step =
    schema.type === 'integer' &&
    (!schema.multipleOf || schema.multipleOf % 1 !== 0)
      ? 1
      : schema.multipleOf;

  return (
    <PrimitiveTemplate {...props}>
      <input
        type={type}
        step={step}
        value={value ?? ''}
        min={schema.minimum}
        max={schema.maximum}
        onChange={e => {
          let v: string | number | undefined = e.target.value;
          if (v === '') {
            v = undefined;
          } else if (type === 'number') {
            v = +v;
          }
          onValue?.(v);
        }}
      />
    </PrimitiveTemplate>
  );
}
