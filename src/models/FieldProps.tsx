import { Layout } from './Layout';
import { Registry } from './Registry';
import { Schema } from './Schema';
import { Validity } from './Validity';

// tslint:disable:member-ordering
export interface FieldProps<TFieldValue = any> {
  schema: Schema;
  layout?: Layout;

  registry: Registry;

  value?: TFieldValue;
  validity?: Validity;

  onValue?: (value: TFieldValue | Promise<TFieldValue>) => void;
  onValidity?: (validity: Validity | Promise<Validity>) => void;
}
// tslint:enable:member-ordering
