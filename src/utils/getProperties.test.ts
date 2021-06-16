import { getProperties } from './getProperties';
import { Schema } from 'src/models';

it('merge properties from multiple sources', () => {
  const schema: Schema = {
    type: 'object',
    title: 'Object with allOf usage',
    properties: {
      a: {
        title: 'AAA',
        type: 'string'
      }
    },
    allOf: [
      {
        type: 'object',
        properties: {
          b: {
            title: 'BBB',
            type: 'number'
          }
        }
      },
      {
        type: 'object',
        properties: {
          c: {
            title: 'CCC',
            type: 'integer'
          }
        }
      }
    ]
  };

  expect(getProperties(schema)).toEqual({
    a: {
      title: 'AAA',
      type: 'string'
    },
    b: {
      title: 'BBB',
      type: 'number'
    },
    c: {
      title: 'CCC',
      type: 'integer'
    }
  });
});

it('ignore unnecessary', () => {
  const schema: Schema = {
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
  };

  expect(getProperties(schema)).toEqual({
    a: {
      title: 'AAA',
      type: 'string'
    },
    b: {
      title: 'BBB',
      type: 'number'
    }
  });
});
