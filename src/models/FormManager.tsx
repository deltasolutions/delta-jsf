import { Dispatch, SetStateAction } from 'react';
import { FormManagerOptions } from './FormManagerOptions';
import { Validity } from './Validity';

export interface FormManager<T = any> {
  options: FormManagerOptions<T>;

  value: T;
  setValue: Dispatch<SetStateAction<T>>;

  validity: Validity;
  extendValidity: (validity: Validity | Promise<Validity>) => Promise<void>;

  isValid: boolean;
  isSubmitted: boolean;

  wait: () => Promise<void>;
  submit: () => Promise<T>;
  validate: (value: T) => Promise<boolean>;
}
