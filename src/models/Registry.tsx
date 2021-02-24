import { ComponentType } from 'react';
import { FieldProps } from './FieldProps';
import { TemplateProps } from './TemplateProps';

export interface Registry {
  fields: Record<string, ComponentType<FieldProps>>;
  templates: Record<string, ComponentType<TemplateProps>>;
}
