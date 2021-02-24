import { Dispatch, SetStateAction } from 'react';
import { FieldError } from './FieldError';
import { FormManagerOptions } from './FormManagerOptions';

// tslint:disable:member-ordering
export interface FormManager<T = any> {
  options: FormManagerOptions<T>;

  value: T;
  error: FieldError;
  setValue: Dispatch<SetStateAction<T>>;
  pushCustomError: (error: FieldError | Promise<FieldError>) => Promise<void>;

  isValid: boolean;
  isSubmitted: boolean;

  wait: () => Promise<void>;
  submit: () => Promise<T>;
  validate: (value: T) => Promise<boolean>;
}
// tslint:enable:member-ordering
