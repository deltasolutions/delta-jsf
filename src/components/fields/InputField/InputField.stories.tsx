import { Meta } from '@storybook/react';
import React from 'react';
import { InputField } from './InputField';
import { formStoryParameters, useStoryFieldProps } from 'storybook/utils';

const meta: Meta = {
  title: 'fields/InputField',
  ...formStoryParameters
};

export default meta;

export const Basic = props => {
  const { type, initValue } = props;
  const fieldProps = useStoryFieldProps(props);
  return (
    <InputField schema={{ type, title: 'Primitive field' }} {...fieldProps} />
  );
};

Basic.args = {
  type: 'string'
};

Basic.argTypes = {
  type: {
    control: {
      type: 'inline-radio',
      options: ['string', 'number', 'integer', 'wrong']
    }
  }
};

export const Filled = props => {
  const fieldProps = useStoryFieldProps(props, 'lorem');
  return (
    <InputField
      schema={{ type: 'string', title: 'With init value' }}
      {...fieldProps}
    />
  );
};
