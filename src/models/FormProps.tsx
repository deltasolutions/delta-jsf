import { ReactNode } from 'react';
import { FormManager } from './FormManager';
import { FormManagerOptions } from './FormManagerOptions';

export interface NativeFormProps
  extends Pick<
    React.FormHTMLAttributes<HTMLFormElement>,
    'style' | 'className' | 'id'
  > {
  children?: ReactNode | ReactNode[];
}

export interface ManagedFormProps<T = any> extends NativeFormProps {
  manager: FormManager<T>;
}

export interface UnmanagedFormProps<T = any>
  extends FormManagerOptions<T>,
    NativeFormProps {}

export type FormProps<T = any> = UnmanagedFormProps<T> | ManagedFormProps<T>;
