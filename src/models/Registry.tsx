import { ComponentType } from 'react';
import { Schema } from 'src';
import { FieldProps } from './FieldProps';
import { TemplateProps } from './TemplateProps';
import { Validity } from './Validity';

export interface Registry {
  fields: Record<string, ComponentType<FieldProps>>;
  templates: Record<string, ComponentType<TemplateProps>>;
  utils: {
    validateAgainstSchema: (schema: Schema, value: any) => Validity;
    [key: string]: (...args: any) => any;
  };
}
