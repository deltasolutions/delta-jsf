import { getConditionals } from './getConditionals';
import { Schema } from 'src/models';

const schemaA: Schema = {
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

const schemaB: Schema = {
  type: 'object',
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
    }
  ]
};

describe('single if', () => {
  it('handle undefined value', () => {
    expect(getConditionals(schemaA, undefined)).toEqual({});
  });
  it('handle empty result', () => {
    expect(getConditionals(schemaA, { b: 3 })).toEqual({});
  });
  it('get valid conditionals', () => {
    expect(getConditionals(schemaA, { b: 5 })).toEqual({
      c: { type: 'string', title: 'CCC' }
    });
  });
});

describe('multiple ifs', () => {
  it('handle undefined value', () => {
    expect(getConditionals(schemaB, undefined)).toEqual({});
  });
  it('handle empty result', () => {
    expect(getConditionals(schemaB, { b: 3 })).toEqual({});
  });
  it('get valid conditionals #1', () => {
    expect(getConditionals(schemaB, { b: 5 })).toEqual({
      c: { type: 'number', title: 'CCC' }
    });
  });
  it('get valid conditionals #2', () => {
    expect(getConditionals(schemaB, { b: 42 })).toEqual({
      e: { type: 'string', title: 'EEE' }
    });
  });
  it('get valid conditionals #3', () => {
    expect(getConditionals(schemaB, { b: 5, c: 5 })).toEqual({
      c: { type: 'number', title: 'CCC' },
      d: { type: 'string', title: 'DDD' }
    });
  });
});
