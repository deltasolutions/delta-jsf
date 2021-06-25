import { Meta } from '@storybook/react';
import React from 'react';
import { ObjectField } from './ObjectField';
import { formStoryParameters, useStoryFieldProps } from 'storybook/utils';

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
            oneOf: [{ const: '1' }, { const: '2' }, { const: '3' }],
            layout: {
              field: 'select',
              placeholder: 'Select an option'
            }
          },
          b: {
            title: 'BBB',
            type: 'string'
          }
        }
      }}
      {...fieldProps}
    />
  );
};

export const Filled = props => {
  const fieldProps = useStoryFieldProps(props, {
    a: 2,
    b: 'test-42',
    c: [42, 24]
  });
  return (
    <ObjectField
      schema={{
        type: 'object',
        title: 'Basic object',
        properties: {
          a: {
            title: 'AAA',
            type: 'string',
            oneOf: [{ const: '1' }, { const: '2' }, { const: '3' }],
            layout: { field: 'select' }
          },
          b: {
            title: 'BBB',
            type: 'string'
          },
          c: {
            title: 'CCC',
            type: 'array',
            items: { type: 'string' }
          }
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
