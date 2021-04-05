import React, { ComponentType } from 'react';
import { FieldProps } from 'src/models';

export const getFieldComponent = (
  props: FieldProps
): ComponentType<FieldProps> => {
  const { schema, layout, registry } = props;
  const {
    fields,
    templates: { PanicTemplate }
  } = registry;
  const Unknown = () => <PanicTemplate {...props}>Unknown field</PanicTemplate>;
  if (layout?.field) {
    return fields[layout.field] ?? Unknown;
  }
  if (typeof schema?.type === 'string') {
    return fields[schema.type] ?? Unknown;
  }
  return Unknown;
};
