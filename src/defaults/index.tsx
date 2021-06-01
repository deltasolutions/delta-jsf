import {
  ArrayField,
  InputField,
  NullField,
  ObjectField,
  SelectField
} from 'src/components';
import { ArrayTemplate } from './ArrayTemplate';
import { PanicTemplate } from './PanicTemplate';
import { createFieldTemplate } from './createFieldTemplate';
import { validateAgainstSchema } from './validateAgainstSchema';

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
