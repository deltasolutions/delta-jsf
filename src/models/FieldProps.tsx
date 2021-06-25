import { Registry } from './Registry';
import { Schema } from './Schema';
import { Validity } from './Validity';

export interface FieldProps<TFieldValue = any> {
  schema: Schema;
  registry: Registry;
  value?: TFieldValue;
  validity?: Validity;
  onValue?: (value: TFieldValue | Promise<TFieldValue>) => void;
  onValidity?: (validity: Validity | Promise<Validity>) => void;
}
