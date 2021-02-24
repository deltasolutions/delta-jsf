import { Meta } from '@storybook/react';
import React from 'react';
import { formStoryParameters, useStoryFieldProps } from 'storybook/utils';
import { InputField } from './InputField';

const meta: Meta = {
  title: 'fields/InputField',
  ...formStoryParameters
};

export default meta;

export const Basic = props => {
  const { type } = props;
  const manager = useStoryFieldProps(props);
  return (
    <InputField schema={{ type, title: 'Primitive field' }} {...manager} />
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
