import { Meta } from '@storybook/react';
import React from 'react';
import { formStoryParameters, useStoryFormProps } from 'storybook/utils';
import { Form } from './Form';

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
  schema: {
    type: 'object',
    properties: {
      equipmentModel: {
        type: 'string',
        default: 'Huawei AR129CGVW-L',
        title: 'Модель оборудования',
        oneOf: [
          {
            title: 'Huawei AR129CGVW-L',
            const: 'Huawei AR129CGVW-L'
          }
        ]
      }
    }
  },
  layout: {
    properties: {
      equipmentModel: {
        field: 'select'
      }
    }
  },
  initialValue: {}
};
