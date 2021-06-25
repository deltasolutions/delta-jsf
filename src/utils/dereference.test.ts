import { dereference } from 'src';

const a: any = {
  type: 'object',
  title: 'Form',
  $defs: {
    mainConfig: {
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
    firstConfig: {
      title: 'A-config',
      type: 'object',
      allOf: [
        { $ref: '#/$defs/mainConfig' },
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
    secondConfig: {
      title: 'B-config',
      type: 'object',
      allOf: [
        { $ref: '#/$defs/mainConfig' },
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
        $ref: '#/$defs/firstConfig'
      }
    }
  },
  else: {
    properties: {
      sub: {
        $ref: '#/$defs/secondConfig'
      }
    }
  }
};

const aRes = {
  type: 'object',
  title: 'Form',
  $defs: {
    mainConfig: {
      type: 'object',
      properties: {
        firstMain: { type: 'string', title: 'First main properties' },
        secondMain: { type: 'string', title: 'Second main properties' }
      },
      required: ['firstMain', 'secondMain']
    },
    firstConfig: {
      title: 'A-config',
      type: 'object',
      allOf: [
        {
          type: 'object',
          properties: {
            firstMain: { type: 'string', title: 'First main properties' },
            secondMain: { type: 'string', title: 'Second main properties' }
          },
          required: ['firstMain', 'secondMain']
        },
        {
          type: 'object',
          properties: {
            first: { type: 'string', title: 'First A-type properties' },
            second: { type: 'string', title: 'Second A-type properties' }
          }
        }
      ]
    },
    secondConfig: {
      title: 'B-config',
      type: 'object',
      allOf: [
        {
          type: 'object',
          properties: {
            firstMain: { type: 'string', title: 'First main properties' },
            secondMain: { type: 'string', title: 'Second main properties' }
          },
          required: ['firstMain', 'secondMain']
        },
        {
          type: 'object',
          properties: {
            first: { type: 'string', title: 'First B-type properties' },
            second: { type: 'string', title: 'Second B-type properties' }
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
  if: { properties: { main: { const: 'a' } } },
  then: {
    properties: {
      sub: {
        title: 'A-config',
        type: 'object',
        allOf: [
          {
            type: 'object',
            properties: {
              firstMain: { type: 'string', title: 'First main properties' },
              secondMain: { type: 'string', title: 'Second main properties' }
            },
            required: ['firstMain', 'secondMain']
          },
          {
            type: 'object',
            properties: {
              first: { type: 'string', title: 'First A-type properties' },
              second: { type: 'string', title: 'Second A-type properties' }
            }
          }
        ]
      }
    }
  },
  else: {
    properties: {
      sub: {
        title: 'B-config',
        type: 'object',
        allOf: [
          {
            type: 'object',
            properties: {
              firstMain: { type: 'string', title: 'First main properties' },
              secondMain: { type: 'string', title: 'Second main properties' }
            },
            required: ['firstMain', 'secondMain']
          },
          {
            type: 'object',
            properties: {
              first: { type: 'string', title: 'First B-type properties' },
              second: { type: 'string', title: 'Second B-type properties' }
            }
          }
        ]
      }
    }
  }
};

const b: any = {
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
};

it('schema A test', () => {
  expect(dereference(a)).toEqual(aRes);
});

it('schema B (without refs) test', () => {
  expect(dereference(b)).toEqual(b);
});
