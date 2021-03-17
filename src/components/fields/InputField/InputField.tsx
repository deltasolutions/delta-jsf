import React from 'react';
import { FieldProps } from 'src/models';

export const InputField = (props: FieldProps) => {
  const {
    schema,
    value,
    onValue,
    registry: {
      templates: { PrimitiveTemplate, PanicTemplate }
    }
  } = props;

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

  return (
    <PrimitiveTemplate {...props}>
      <input
        type={type}
        value={value ?? ''}
        min={schema.minimum}
        max={schema.maximum}
        step={schema.multipleOf}
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
};
