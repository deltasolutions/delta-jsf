import { FieldError } from './FieldError';
import { Layout } from './Layout';
import { Registry } from './Registry';
import { Schema } from './Schema';

// tslint:disable:member-ordering
export interface FormManagerOptions<T = any> {
  schema: Schema;
  layout?: Layout;
  registry?: Registry;
  onValue?: (value: T) => void;
  onError?: (error: FieldError) => void;
  onSubmit?: (value: T) => void;
  initialValue?: T;
}
// tslint:enable:member-ordering
