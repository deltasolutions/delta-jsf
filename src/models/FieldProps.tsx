import { FieldError } from './FieldError';
import { Layout } from './Layout';
import { Registry } from './Registry';
import { Schema } from './Schema';

// tslint:disable:member-ordering
export interface FieldProps<TFieldValue = any> {
  schema: Schema;
  layout?: Layout;

  registry: Registry;

  value?: TFieldValue;
  error?: FieldError;

  onValue?: (value: TFieldValue | Promise<TFieldValue>) => void;
  onError?: (error: FieldError | Promise<FieldError>) => void;
}
// tslint:enable:member-ordering
