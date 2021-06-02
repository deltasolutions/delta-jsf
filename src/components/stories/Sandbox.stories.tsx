import { Meta } from '@storybook/react';
import React from 'react';
import { formStoryParameters, useStoryFormProps } from 'storybook/utils';
import { Form } from '../Form';

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
        field: 'fan_control'
      }
    }
  },
  schema: {
    $defs: {
      complex_config: {
        description: 'Complex fan control configuration',
        properties: {
          fan_control_loops: {
            description: 'List of fan [desired rpm] -> [pwm] controllers',
            items: {
              $ref: '#/$defs/fan_control_loop'
            },
            type: 'array'
          },
          thermal_control_loops: {
            description:
              'List of [temperature] -> [desired fan rpm] controllers',
            items: {
              $ref: '#/$defs/thermal_control_loop'
            },
            type: 'array'
          }
        },
        required: ['fan_control_loops', 'thermal_control_loops'],
        type: 'object'
      },
      fan_control_loop: {
        properties: {
          fan_name: {
            description:
              'The name of the controlled fan as returned by EntityManager',
            type: 'string'
          },
          pid: {
            type: 'object',
            allOf: [
              {
                $ref: '#/$defs/pid_coefficient_set'
              },
              {
                type: 'object',
                properties: {
                  output_limits_max: {
                    maximum: 100,
                    minimum: 0
                  },
                  output_limits_min: {
                    maximum: 100,
                    minimum: 0
                  }
                }
              }
            ]
          }
        },
        required: ['fan_name', 'pid'],
        type: 'object'
      },
      pid_coefficient_set: {
        description: 'Coefficients of a PID controller',
        properties: {
          correction_speed_limits_max: {
            description:
              'Upper bound of the correction speed [output units / sec]',
            type: 'number'
          },
          correction_speed_limits_min: {
            description:
              'Lower bound of the correction speed [output units / sec]',
            type: 'number'
          },
          derivative_coeff: {
            description: 'Derivative coefficient [unitless]',
            type: 'number'
          },
          integral_coeff: {
            description: 'Integral coefficient [unitless]',
            type: 'number'
          },
          integral_limits_max: {
            description:
              'Upper bound of the integral term [output units * sec]',
            type: 'number'
          },
          integral_limits_min: {
            description:
              'Lower bound of the integral term [output units * sec]',
            type: 'number'
          },
          output_limits_max: {
            description: 'Maximal meaningful output value [output units]',
            type: 'number'
          },
          output_limits_min: {
            description: 'Minimal meaningful output value [output units]',
            type: 'number'
          },
          proportional_coeff: {
            description: 'Proportional coefficient [unitless]',
            type: 'number'
          }
        },
        required: [
          'output_limits_min',
          'output_limits_max',
          'integral_limits_min',
          'integral_limits_max'
        ],
        type: 'object'
      },
      simple_config: {
        description: 'Simple fan control configuration',
        properties: {
          table: {
            $ref: '#/$defs/stepwise_table'
          }
        },
        required: ['table'],
        type: 'object'
      },
      stepwise_table: {
        description: 'A table directly mapping input values to output values',
        properties: {
          table_data: {
            items: {
              $ref: '#/$defs/stepwise_table_entry'
            },
            minItems: 1,
            type: 'array'
          }
        },
        required: ['table_data'],
        type: 'object'
      },
      stepwise_table_entry: {
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
      thermal_control_loop: {
        else: {
          properties: {
            data: {
              $ref: '#/$defs/stepwise_table'
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
              $ref: '#/$defs/pid_coefficient_set'
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
          $ref: '#/$defs/complex_config'
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
          $ref: '#/$defs/simple_config'
        }
      }
    },
    type: 'object'
  },
  initialValue: {}
};
