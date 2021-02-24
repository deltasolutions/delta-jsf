import { ReactNode } from 'react';
import { FieldProps } from './FieldProps';

export interface TemplateProps extends FieldProps {
  children?: ReactNode;
}
