import { ComponentType } from 'react';
import { FieldProps } from './FieldProps';
import { TemplateProps } from './TemplateProps';
import { ValidateAgainstSchemaFunction } from './ValidateAgainstSchemaFunction';

export interface Registry {
  fields: { [key: string]: ComponentType<FieldProps> };
  templates: { [key: string]: ComponentType<TemplateProps> };
  utils: {
    validateAgainstSchema: ValidateAgainstSchemaFunction;
    [key: string]: (...args: any) => any;
  };
}
