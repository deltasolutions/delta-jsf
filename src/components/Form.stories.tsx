import { Meta } from '@storybook/react';
import React from 'react';
import { formStoryParameters, useStoryFormProps } from 'storybook/utils';
import { Form } from './Form';

const meta: Meta = {
  title: 'Examples',
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
