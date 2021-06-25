import { Meta } from '@storybook/react';
import React from 'react';
import { ArrayField } from './ArrayField';
import { formStoryParameters, useStoryFieldProps } from 'storybook/utils';

const meta: Meta = {
  title: 'fields/ArrayField',
  ...formStoryParameters
};

export default meta;

export const Basics = props => {
  const fieldProps = useStoryFieldProps(props);
  return (
    <ArrayField
      schema={{
        title: 'Array of strings',
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

export const InitialValue = props => {
  const fieldProps = useStoryFieldProps(props, ['12345', '56789']);
  return (
    <ArrayField
      schema={{
        title: 'Array with initial value',
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

export const ItemsLimits = props => {
  const fieldProps = useStoryFieldProps(props, ['1', '2']);
  return (
    <ArrayField
      schema={{
        title: 'With maxItems and minItems',
        type: 'array',
        maxItems: 3,
        minItems: 1,
        items: {
          type: 'string'
        },
        additionalItems: true
      }}
      {...fieldProps}
    />
  );
};
