import { TemplateProps } from 'src/models';

export const PanicTemplate = ({ schema, children }: TemplateProps) => (
  <div className="djsf-panic">
    {children}
    <pre>
      <code>{JSON.stringify(schema, null, 2)}</code>
    </pre>
  </div>
);
