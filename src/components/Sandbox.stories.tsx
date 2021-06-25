import { Meta } from '@storybook/react';
import React from 'react';
import { Form } from 'src';
import { formStoryParameters, useStoryFormProps } from 'storybook/utils';

const meta: Meta = {
  title: 'Sandbox',
  ...formStoryParameters
};

export default meta;

export const Basic = props => {
  const { schema, layout, ...rest } = props ?? {};

  const formProps = useStoryFormProps({
    ...rest,
    onSubmit: values => console.log(values),
    ...(schema && layout
      ? { schema, layout }
      : {
          schema: {
            title: 'Неверный JSON',
            type: 'null'
          },
          layout: {}
        })
  });
  return <Form {...formProps} />;
};

Basic.args = {
  layout: {
    properties: {
      serviceType: {
        field: 'fanControl'
      }
    }
  },
  schema: {
    $defs: {
      complexConfig: {
        description: 'Complex fan control configuration',
        properties: {
          fanControlLoops: {
            description: 'List of fan [desired rpm] -> [pwm] controllers',
            items: {
              $ref: '#/$defs/fanControlLoop'
            },
            type: 'array'
          },
          thermalControlLoops: {
            description:
              'List of [temperature] -> [desired fan rpm] controllers',
            items: {
              $ref: '#/$defs/thermalControlLoop'
            },
            type: 'array'
          }
        },
        required: ['fanControlLoops', 'thermalControlLoops'],
        type: 'object'
      },
      fanControlLoop: {
        properties: {
          fanName: {
            description:
              'The name of the controlled fan as returned by EntityManager',
            type: 'string'
          },
          pid: {
            type: 'object',
            allOf: [
              {
                $ref: '#/$defs/pidCoefficientSet'
              },
              {
                type: 'object',
                properties: {
                  outputLimitsMax: {
                    maximum: 100,
                    minimum: 0
                  },
                  outputLimitsMin: {
                    maximum: 100,
                    minimum: 0
                  }
                }
              }
            ]
          }
        },
        required: ['fanName', 'pid'],
        type: 'object'
      },
      pidCoefficientSet: {
        description: 'Coefficients of a PID controller',
        properties: {
          correctionSpeedLimitsMax: {
            description:
              'Upper bound of the correction speed [output units / sec]',
            type: 'number'
          },
          correctionSpeedLimitsMin: {
            description:
              'Lower bound of the correction speed [output units / sec]',
            type: 'number'
          },
          derivativeCoeff: {
            description: 'Derivative coefficient [unitless]',
            type: 'number'
          },
          integralCoeff: {
            description: 'Integral coefficient [unitless]',
            type: 'number'
          },
          integralLimitsMax: {
            description:
              'Upper bound of the integral term [output units * sec]',
            type: 'number'
          },
          integralLimitsMin: {
            description:
              'Lower bound of the integral term [output units * sec]',
            type: 'number'
          },
          outputLimitsMax: {
            description: 'Maximal meaningful output value [output units]',
            type: 'number'
          },
          outputLimitsMin: {
            description: 'Minimal meaningful output value [output units]',
            type: 'number'
          },
          proportionalCoeff: {
            description: 'Proportional coefficient [unitless]',
            type: 'number'
          }
        },
        required: [
          'outputLimitsMin',
          'outputLimitsMax',
          'integralLimitsMin',
          'integralLimitsMax'
        ],
        type: 'object'
      },
      simpleConfig: {
        description: 'Simple fan control configuration',
        properties: {
          table: {
            $ref: '#/$defs/stepwiseTable'
          }
        },
        required: ['table'],
        type: 'object'
      },
      stepwiseTable: {
        description: 'A table directly mapping input values to output values',
        properties: {
          tableData: {
            items: {
              $ref: '#/$defs/stepwiseTableEntry'
            },
            minItems: 1,
            type: 'array'
          }
        },
        required: ['tableData'],
        type: 'object'
      },
      stepwiseTableEntry: {
        properties: {
          output: {
            description: 'Output value',
            type: 'number'
          },
          reading: {
            description: 'Input value',
            type: 'number'
          }
        },
        required: ['reading', 'output'],
        type: 'object'
      },
      thermalControlLoop: {
        else: {
          properties: {
            data: {
              $ref: '#/$defs/stepwiseTable'
            }
          }
        },
        if: {
          properties: {
            type: {
              const: 'pid'
            }
          }
        },
        properties: {
          fans: {
            description: 'List of fans to drive',
            items: {
              type: 'string'
            },
            minItems: 1,
            type: 'array'
          },
          sensors: {
            description: 'List of sensors to take measurements from',
            items: {
              type: 'string'
            },
            minItems: 1,
            type: 'array'
          },
          type: {
            description: 'Type of the controller (pid or stepwise)',
            enum: ['pid', 'stepwise'],
            type: 'string'
          }
        },
        required: ['sensors', 'fans', 'type', 'data'],
        then: {
          properties: {
            data: {
              $ref: '#/$defs/pidCoefficientSet'
            },
            setpoint: {
              description: 'Target output level',
              type: 'number'
            }
          },
          required: ['setpoint']
        },
        type: 'object'
      }
    },
    description: 'Fan control configuration',
    else: {
      properties: {
        config: {
          $ref: '#/$defs/complexConfig'
        }
      }
    },
    if: {
      properties: {
        type: {
          const: 'simple'
        }
      }
    },
    properties: {
      type: {
        enum: ['simple', 'complex'],
        type: 'string'
      }
    },
    required: ['type', 'config'],
    then: {
      properties: {
        config: {
          $ref: '#/$defs/simpleConfig'
        }
      }
    },
    type: 'object'
  },
  initialValue: {}
};
