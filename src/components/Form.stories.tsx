import { Meta } from '@storybook/react';
import React from 'react';
import { formStoryParameters, useStoryFormProps } from 'storybook/utils';
import { Form } from './Form';

const meta: Meta = {
  title: 'Form',
  ...formStoryParameters
};

export default meta;

export const Basic = props => {
  return (
    <Form
      schema={{
        type: 'object',
        properties: {
          system: {
            type: 'array',
            minItems: 1,
            title: 'Проект',
            items: {
              type: 'string',
              oneOf: [
                {
                  const: 'VCPE',
                  title: 'Интернет 2.0'
                },
                {
                  const: 'IAAS',
                  title: 'BeeCloud'
                }
              ]
            }
          }
        }
      }}
    />
  );
};
