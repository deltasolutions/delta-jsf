import React from 'react';
import { TemplateProps } from 'src/models';
import { ArrayField, InputField, ObjectField, SelectField } from './components';

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

const ArrayFieldTemplate = ({
  children,
  schema,
  validity: error,
  value: values,
  onValue
}: TemplateProps) => {
  const { additionalItems, maxItems, minItems } = schema ?? {};
  const hasDeleteBtn = (values?.length ?? 0) > (minItems ?? 0);
  const hasAddBtn =
    (values?.length ?? 0) < (maxItems ?? Infinity) && !!additionalItems;
  const errorMessages = error?.errors ?? [];
  return (
    <div className="djsf-array">
      {schema.title && <div className="title">{schema.title}</div>}
      {hasAddBtn && (
        <button
          onClick={() => onValue?.(v => [...v, null])}
          className="add-btn"
        >
          add
        </button>
      )}
      <div className="content">
        {Array.isArray(children) ? (
          [...children]?.map((child, index) => (
            <div className="wrap" key={`array-wrap-${index ** 2}`}>
              {child}
              {hasDeleteBtn && (
                <button
                  onClick={() =>
                    onValue?.(v => v?.filter((d, i) => i !== index))
                  }
                >
                  delete
                </button>
              )}
            </div>
          ))
        ) : (
          <>
            {children}
            {hasDeleteBtn && (
              <button onClick={() => onValue?.([])}>delete</button>
            )}
          </>
        )}
      </div>
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
      object: ObjectField,
      array: ArrayField
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
      ObjectTemplate: createFieldTemplate('djsf-object'),
      ArrayTemplate: ArrayFieldTemplate
    }
  }
};
