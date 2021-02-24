import { Meta } from '@storybook/react';
import React from 'react';
import { formStoryParameters, useStoryFieldProps } from 'storybook/utils';
import { SelectField } from './SelectField';

const meta: Meta = {
  title: 'fields/SelectField',
  ...formStoryParameters
};

export default meta;

export const Basic = props => {
  const manager = useStoryFieldProps(props);
  return (
    <SelectField
      schema={{
        type: 'string',
        title: 'Select field',
        oneOf: [
          {
            const: '1'
          },
          {
            const: '2'
          },
          {
            const: '3'
          }
        ]
      }}
      {...manager}
    />
  );
};
