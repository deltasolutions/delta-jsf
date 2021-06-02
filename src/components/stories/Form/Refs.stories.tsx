import { Meta } from '@storybook/react';
import React from 'react';
import { Form } from 'src/components';
import { formStoryParameters, useStoryFormProps } from 'storybook/utils';

const meta: Meta = {
  title: 'Examples',
  ...formStoryParameters
};

export default meta;

export const Refs = props => {
  const formProps = useStoryFormProps({
    ...props,
    onSubmit: values => console.log(values),
    schema: {
      type: 'object',
      title: 'Form',
      $defs: {
        main_config: {
          type: 'object',
          properties: {
            firstMain: {
              type: 'string',
              title: 'First main properties'
            },
            secondMain: {
              type: 'string',
              title: 'Second main properties'
            }
          },
          required: ['firstMain', 'secondMain']
        },
        first_config: {
          title: 'A-config',
          type: 'object',
          allOf: [
            { $ref: '#/$defs/main_config' },
            {
              type: 'object',
              properties: {
                first: {
                  type: 'string',
                  title: 'First A-type properties'
                },
                second: {
                  type: 'string',
                  title: 'Second A-type properties'
                }
              }
            }
          ]
        },
        second_config: {
          title: 'B-config',
          type: 'object',
          allOf: [
            { $ref: '#/$defs/main_config' },
            {
              type: 'object',
              properties: {
                first: {
                  type: 'string',
                  title: 'First B-type properties'
                },
                second: {
                  type: 'string',
                  title: 'Second B-type properties'
                }
              }
            }
          ]
        }
      },
      required: ['main', 'sub'],
      properties: {
        main: {
          oneOf: [
            { const: 'a', title: 'A' },
            { const: 'b', title: 'B' }
          ],
          title: 'Config type',
          type: 'string'
        }
      },
      if: {
        properties: {
          main: {
            const: 'a'
          }
        }
      },
      then: {
        properties: {
          sub: {
            $ref: '#/$defs/first_config'
          }
        }
      },
      else: {
        properties: {
          sub: {
            $ref: '#/$defs/second_config'
          }
        }
      }
    },
    layout: { properties: { main: { field: 'select' } } }
  });
  return <Form {...formProps} />;
};
