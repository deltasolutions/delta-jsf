import { Layout } from './Layout';
import { Registry } from './Registry';
import { Schema } from './Schema';
import { Validity } from './Validity';

// tslint:disable:member-ordering
export interface FormManagerOptions<T = any> {
  initialValue?: T;
  schema: Schema;
  layout?: Layout;
  registry?: Registry;
  dereference?: (schema: Schema) => Promise<Schema>;
  onValue?: (value: T) => void;
  onValidity?: (validation: Validity) => void;
  onSubmit?: (value: T) => void;
}
// tslint:enable:member-ordering
