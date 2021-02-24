import React from 'react';
import { TemplateProps } from 'src/models';
import { InputField, ObjectField, SelectField } from './components';

const createFieldTemplate = (topClassName: string) => ({
  children,
  schema,
  validity: error
}: TemplateProps) => {
  const errorMessages = error?.errors ?? [];
  return (
    <div className={topClassName}>
      {schema.title && <div className="title">{schema.title}</div>}
      <div className="content">{children}</div>
      {errorMessages.length > 0 && (
        <div className="error">
          {errorMessages.map(e => (
            <div key={e}>{e}</div>
          ))}
        </div>
      )}
    </div>
  );
};

export const defaults = {
  registry: {
    fields: {
      string: InputField,
      number: InputField,
      integer: InputField,
      select: SelectField,
      object: ObjectField
    },
    templates: {
      PanicTemplate: ({ schema, children }: TemplateProps) => (
        <div className="djsf-panic">
          {children}
          <pre>
            <code>{JSON.stringify(schema, null, 2)}</code>
          </pre>
        </div>
      ),
      PrimitiveTemplate: createFieldTemplate('djsf-primitive'),
      ObjectTemplate: createFieldTemplate('djsf-object')
    }
  }
};
