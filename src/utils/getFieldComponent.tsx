import React, { ComponentType } from 'react';
import { FieldProps } from '../models';

export const getFieldComponent = (
  props: FieldProps
): ComponentType<FieldProps> => {
  const {
    schema: { type, layout: { field } = {} },
    registry: {
      fields,
      templates: { PanicTemplate }
    }
  } = props;
  const Unknown = () => <PanicTemplate {...props}>Unknown field</PanicTemplate>;
  if (typeof field === 'string') {
    return fields[field] ?? Unknown;
  }
  if (typeof type === 'string') {
    return fields[type] ?? Unknown;
  }
  return Unknown;
};
