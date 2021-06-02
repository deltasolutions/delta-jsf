import React from 'react';
import { useDefaults } from 'src/hooks';
import { FieldProps } from 'src/models';

export function SelectField(props: FieldProps) {
  const {
    schema,
    value,
    onValue,
    registry: {
      templates: { PrimitiveTemplate, PanicTemplate }
    },
    layout
  } = props;

  useDefaults(props);

  const { placeholder } = layout?.options ?? {};
  const { type, oneOf } = schema;

  if (type !== 'string') {
    return (
      <PanicTemplate {...props}>Select field: type must "string"</PanicTemplate>
    );
  }

  if (!oneOf) {
    return (
      <PanicTemplate {...props}>Select field: oneOf must be used</PanicTemplate>
    );
  }

  return (
    <PrimitiveTemplate {...props}>
      <select
        value={value ?? ''}
        onChange={e => {
          let v: string | number | undefined = e.target.value;
          if (v === '') {
            v = undefined;
          }
          onValue?.(v);
        }}
      >
        <option hidden disabled value="">
          {placeholder ?? ''}
        </option>
        {oneOf.map(v => {
          if (typeof v !== 'object') {
            return (
              <PanicTemplate {...props}>
                Select field: oneOf[i] must be object
              </PanicTemplate>
            );
          }
          if (typeof v.const !== 'string') {
            return (
              <PanicTemplate {...props}>
                Select field: oneOf[i].const must be string
              </PanicTemplate>
            );
          }
          return (
            <option key={v.const} value={v.const}>
              {v.title ?? v.const}
            </option>
          );
        })}
      </select>
    </PrimitiveTemplate>
  );
}
