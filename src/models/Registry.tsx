import { ComponentType } from 'react';
import { FieldProps } from './FieldProps';
import { Schema } from './Schema';
import { TemplateProps } from './TemplateProps';
import { Validity } from './Validity';

export interface Registry {
  fields: { [key: string]: ComponentType<FieldProps> };
  templates: { [key: string]: ComponentType<TemplateProps> };
  utils: {
    validateAgainstSchema: (schema: Schema, value: any) => Validity;
    [key: string]: (...args: any) => any;
  };
}
