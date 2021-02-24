import { Layout } from './Layout';
import { Registry } from './Registry';
import { Schema } from './Schema';
import { Validity } from './Validity';

// tslint:disable:member-ordering
export interface FormManagerOptions<T = any> {
  schema: Schema;
  layout?: Layout;
  registry?: Registry;
  onValue?: (value: T) => void;
  onValidity?: (validation: Validity) => void;
  onSubmit?: (value: T) => void;
  initialValue?: T;
}
// tslint:enable:member-ordering
