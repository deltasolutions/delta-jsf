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

export const NtpExample = props => {
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
