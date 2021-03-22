import { Schema } from 'src/models';
import { getConditionals } from './getConditionals'

const firstTestSchema: Schema = {
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
};

const secondTestSchema: Schema = {
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
    },
    {
      type: 'object',
      if: {
        type: 'object',
        properties: {
          b: { const: 42 }
        },
        required: ['b']
      },
      then: {
        type: 'object',
        properties: {
          e: { type: 'string', title: 'EEE' }
        }
      }
    },
  ]
};


describe('one if', () => {
  it('without value', () => {
    expect(getConditionals(firstTestSchema, undefined)).toEqual({});
  });
  it('with expected value', () => {
    expect(getConditionals(firstTestSchema, { b: 3 })).toEqual({});
  });
  it('with expected value', () => {
    expect(getConditionals(firstTestSchema, { b: 5 })).toEqual({ c: { type: 'string', title: 'CCC' } });
  });
});
describe('multiple Ifs', () => {
  it('without value', () => {
    expect(getConditionals(secondTestSchema, undefined)).toEqual({});
  });
  it('value not match the conditions', () => {
    expect(getConditionals(secondTestSchema, { b: 3 })).toEqual({});
  });
  it('match the conditions 1', () => {
    expect(getConditionals(secondTestSchema, { b: 5 })).toEqual({ c: { type: 'number', title: 'CCC' } });
  });
  it('match the conditions 2', () => {
    expect(getConditionals(secondTestSchema, { b: 42 })).toEqual({ e: { type: 'string', title: 'EEE' } });
  });
  it('match the conditions 3', () => {
    expect(getConditionals(secondTestSchema, { b: 5, c: 5 })).toEqual({
      c: { type: 'number', title: 'CCC' },
      d: { type: 'string', title: 'DDD' }
    });
  });
});
