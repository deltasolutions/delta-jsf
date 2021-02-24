import React from 'react';
import { FieldProps } from 'src/models';

export const SelectField = (props: FieldProps) => {
  const {
    schema,
    value,
    onValue,
    registry: {
      templates: { PrimitiveTemplate, PanicTemplate }
    }
  } = props;

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
};
