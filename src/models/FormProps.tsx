import { ReactNode } from 'react';
import { useFormManager } from 'src/hooks';
import { FormManagerOptions } from './FormManagerOptions';

export interface ManagedFormProps<T = any> {
  children?: ReactNode | ReactNode[];
  manager: ReturnType<typeof useFormManager>;
}

export interface UnmanagedFormProps<T = any> extends FormManagerOptions<T> {
  children?: ReactNode | ReactNode[];
}

export type FormProps<T = any> = UnmanagedFormProps<T> | ManagedFormProps<T>;
