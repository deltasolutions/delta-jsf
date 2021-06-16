import { validateAgainstSchema } from './validateAgainstSchema';
import {
  createFieldTemplate,
  ArrayField,
  ArrayTemplate,
  InputField,
  NullField,
  ObjectField,
  PanicTemplate,
  SelectField
} from 'src/components';

export const defaults = {
  registry: {
    fields: {
      string: InputField,
      number: InputField,
      integer: InputField,
      select: SelectField,
      object: ObjectField,
      array: ArrayField,
      null: NullField
    },
    templates: {
      PanicTemplate,
      ArrayTemplate,
      PrimitiveTemplate: createFieldTemplate('djsf-primitive'),
      ObjectTemplate: createFieldTemplate('djsf-object')
    },
    utils: {
      validateAgainstSchema
    }
  }
};
