import { Schema } from './Schema';
import { Validity } from './Validity';

export interface ValidateAgainstSchemaOptions {
  schema: Schema;
  value: any;
}

export interface ValidateAgainstSchemaFunction {
  (options: ValidateAgainstSchemaOptions): Validity;
}
