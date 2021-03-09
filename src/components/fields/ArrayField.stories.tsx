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
  const fieldProps = useStoryFieldProps(props, [1, 2]);
  return (
    <ArrayField
      schema={{
        title: 'Basic object',
        type: 'array',
        items: {
          type: 'number'
        },
        additionalItems: true
      }}
      {...fieldProps}
    />
  );
};
