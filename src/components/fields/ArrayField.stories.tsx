import { Meta } from '@storybook/react';
import React from 'react';
import { formStoryParameters, useStoryFieldProps } from 'storybook/utils';
import { ArrayField } from './ArrayField';

const meta: Meta = {
  title: 'fields/ArrayField',
  ...formStoryParameters
};

export default meta;

export const Basic = props => {
  const fieldProps = useStoryFieldProps(props, ['12345', '56789']);
  return (
    <ArrayField
      schema={{
        title: 'Basic object',
        type: 'array',
        items: {
          type: 'string',
          minLength: 5
        },
        additionalItems: true
      }}
      {...fieldProps}
    />
  );
};
