import { Meta } from '@storybook/react';
import React from 'react';
import { Form } from 'src/components';
import { formStoryParameters, useStoryFormProps } from 'storybook/utils';

const meta: Meta = {
  title: 'Examples',
  ...formStoryParameters
};

export default meta;

export const MultipleIfs = props => {
  const formProps = useStoryFormProps({
    ...props,
    onSubmit: values => console.log(values),
    schema: {
      type: 'object',
      required: ['serviceType'],
      allOf: [
        {
          type: 'object',
          properties: {
            serviceType: {
              type: 'string',
              title: 'Service Type',
              oneOf: [
                {
                  const: 'NTP'
                },
                {
                  const: 'RTC'
                }
              ]
            }
          }
        },
        {
          if: {
            type: 'object',
            properties: {
              serviceType: { const: 'NTP' }
            },
            required: ['serviceType']
          },
          then: {
            type: 'object',
            properties: {
              servers: {
                type: 'array',
                title: 'NTP servers',
                items: {
                  type: 'string'
                }
              }
            }
          }
        },
        {
          if: {
            type: 'object',
            properties: {
              serviceType: { const: 'RTC' }
            },
            required: ['serviceType']
          },
          then: {
            type: 'object',
            properties: {
              time: {
                type: 'string',
                title: 'Time'
              }
            }
          }
        }
      ]
    },
    layout: { properties: { serviceType: { field: 'select' } } }
  });
  return <Form {...formProps} />;
};
