import { ReactNode } from 'react';
import { FormManager } from './FormManager';
import { FormManagerOptions } from './FormManagerOptions';

export interface ManagedFormProps<T = any> {
  children?: ReactNode | ReactNode[];
  manager: FormManager<T>;
}

export interface UnmanagedFormProps<T = any> extends FormManagerOptions<T> {
  children?: ReactNode | ReactNode[];
}

export type FormProps<T = any> = UnmanagedFormProps<T> | ManagedFormProps<T>;
