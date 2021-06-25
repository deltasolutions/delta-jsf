import { Meta } from '@storybook/react';
import React from 'react';
import { SelectField } from './SelectField';
import { formStoryParameters, useStoryFieldProps } from 'storybook/utils';

const meta: Meta = {
  title: 'fields/SelectField',
  ...formStoryParameters
};

export default meta;

export const Basics = props => {
  const fieldProps = useStoryFieldProps(props);
  return (
    <SelectField
      schema={{
        type: 'string',
        title: 'Select field',
        oneOf: [{ const: '1' }, { const: '2' }, { const: '3' }],
        layout: {
          field: 'select',
          placeholder: 'Select an option'
        }
      }}
      {...fieldProps}
    />
  );
};

export const InitialValue = props => {
  const fieldProps = useStoryFieldProps(props, '2');
  return (
    <SelectField
      schema={{
        type: 'string',
        title: 'With initial value',
        oneOf: [{ const: '1' }, { const: '2' }, { const: '3' }],
        layout: { field: 'select' }
      }}
      {...fieldProps}
    />
  );
};
