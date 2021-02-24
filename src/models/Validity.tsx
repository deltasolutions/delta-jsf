export interface Validity {
  errors?: string[];
  items?: Validity[];
  properties?: Record<string, Validity>;
}
