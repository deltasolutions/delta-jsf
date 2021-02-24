// tslint:disable:member-ordering
export interface FieldError {
  messages?: string[];
  items?: FieldError[];
  properties?: Record<string, FieldError>;
}
// tslint:enable:member-ordering
