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
  const formProps = useStoryFormProps({
    ...props,
    onSubmit: values => console.log(values),
    schema: {
      type: 'object',
      title: 'Form',
      allOf: [
        {
          type: 'object',
          properties: {
            a: {
              type: 'integer',
              title: 'AAA',
              maximum: 5
            }
          }
        },
        {
          type: 'object',
          if: {
            type: 'object',
            properties: {
              a: { const: 5 }
            },
            required: ['a']
          },
          then: {
            type: 'object',
            properties: {
              b: {
                type: 'string',
                title: 'BBB'
              }
            }
          }
        }
      ]
    }
  });
  return <Form {...formProps} />;
};
