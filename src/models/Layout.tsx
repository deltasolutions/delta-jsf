// tslint:disable:member-ordering
export interface Layout {
  field?: string;
  options?: any;

  items?: Layout;
  properties?: Record<string, Layout>;
  order?: string[];
}
// tslint:enable:member-ordering
