import { FormProps, ManagedFormProps } from '../models';

export const isObject = (v): v is object => typeof v === 'object' && v;

export const isPromise = <T extends unknown>(v): v is Promise<T> =>
  v instanceof Promise;

export const areManagedFormProps = <T extends unknown>(
  props: FormProps<T>
): props is ManagedFormProps<T> => !!(props as any).manager;
