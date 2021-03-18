import { Meta } from '@storybook/react';
import React from 'react';
import { formStoryParameters, useStoryFieldProps } from 'storybook/utils';
import { ObjectField } from './ObjectField';

const meta: Meta = {
  title: 'fields/ObjectField',
  ...formStoryParameters
};

export default meta;

export const Basic = props => {
  const fieldProps = useStoryFieldProps(props);
  return (
    <ObjectField
      schema={{
        type: 'object',
        title: 'Basic object',
        properties: {
          a: {
            title: 'AAA',
            type: 'string',
            oneOf: [{ const: '1' }, { const: '2' }, { const: '3' }]
          },
          b: {
            title: 'BBB',
            type: 'string'
          }
        }
      }}
      layout={{
        properties: {
          a: { field: 'select' }
        }
      }}
      {...fieldProps}
    />
  );
};

export const AllOf = props => {
  const fieldProps = useStoryFieldProps(props);
  return (
    <ObjectField
      schema={{
        type: 'object',
        title: 'Object with allOf usage',
        allOf: [
          {
            type: 'object',
            properties: {
              a: {
                title: 'AAA',
                type: 'string'
              }
            }
          },
          {
            type: 'object',
            properties: {
              b: {
                title: 'BBB',
                type: 'string'
              }
            }
          }
        ]
      }}
      {...fieldProps}
    />
  );
};

export const If = props => {
  const fieldProps = useStoryFieldProps(props);
  return (
    <ObjectField
      schema={{
        type: 'object',
        title: 'Object with if usage',
        properties: {
          a: {
            title: 'AAA',
            type: 'string'
          },
          b: {
            title: 'BBB',
            type: 'number'
          }
        },
        if: {
          type: 'object',
          properties: {
            b: { const: 5 }
          },
          required: ['b']
        },
        then: {
          type: 'object',
          properties: {
            c: { type: 'string', title: 'CCC' }
          }
        }
      }}
      {...fieldProps}
    />
  );
};

export const MultipleIfs = props => {
  const fieldProps = useStoryFieldProps(props);
  return (
    <ObjectField
      schema={{
        type: 'object',
        title: 'Object with if usage',
        allOf: [
          {
            type: 'object',
            properties: {
              a: {
                title: 'AAA',
                type: 'string'
              },
              b: {
                title: 'BBB',
                type: 'number'
              }
            }
          },
          {
            type: 'object',
            if: {
              type: 'object',
              properties: {
                b: { const: 5 }
              },
              required: ['b']
            },
            then: {
              type: 'object',
              properties: {
                c: { type: 'number', title: 'CCC' }
              }
            }
          },
          {
            type: 'object',
            if: {
              type: 'object',
              properties: {
                c: { const: 5 }
              },
              required: ['c']
            },
            then: {
              type: 'object',
              properties: {
                d: { type: 'string', title: 'DDD' }
              }
            }
          }
        ]
      }}
      {...fieldProps}
    />
  );
};