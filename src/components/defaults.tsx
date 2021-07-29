import { validateAgainstSchemaViaAjv } from '../utils';
import {
  ArrayField,
  InputField,
  NullField,
  ObjectField,
  SelectField
} from './fields';
import { ArrayTemplate, PanicTemplate, createFieldTemplate } from './templates';

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
      validateAgainstSchema: validateAgainstSchemaViaAjv
    }
  }
};
