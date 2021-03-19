import React, { Fragment, ReactNode } from 'react';
import { TemplateProps, Validity } from 'src/models';
import { ArrayField, InputField, ObjectField, SelectField } from './components';

const getErrors = (validity?: Validity): ReactNode => {
  const errors = validity?.errors ?? [];
  return (
    errors.length > 0 && (
      <div className="error">
        {errors.map(e => (
          <div key={e}>{e}</div>
        ))}
      </div>
    )
  );
};

const createFieldTemplate = (topClassName: string) => ({
  children,
  schema,
  validity
}: TemplateProps) => {
  return (
    <div className={topClassName}>
      {schema.title && <div className="title">{schema.title}</div>}
      <div className="content">{children}</div>
      {getErrors(validity)}
    </div>
  );
};

const ArrayFieldTemplate = ({
  children,
  schema,
  validity,
  value: values,
  onValue
}: TemplateProps) => {
  const { additionalItems, maxItems, minItems } = schema ?? {};

  const hasDeleteBtn = (values?.length ?? 0) > (minItems ?? 0);
  const handleDelete = (itemIdex: number) =>
    onValue?.(v => v?.filter((d, i) => i !== itemIdex) ?? []);

  const hasAddBtn =
    (values?.length ?? 0) < (maxItems ?? Infinity) && !!additionalItems;
  const handleAdd = () =>
    onValue?.(v => (Array.isArray(v) ? [...v, null] : [null]));

  return (
    <div className="djsf-array">
      {schema.title && <div className="title">{schema.title}</div>}
      {hasAddBtn && <button onClick={handleAdd}>add</button>}
      <div className="content">
        {Array.isArray(children)
          ? [...children]?.map((child, index) => (
              <Fragment key={`array-wrap-${index ** 2}`}>
                <div className="wrap">
                  {child}
                  {hasDeleteBtn && (
                    <button onClick={() => handleDelete(index)}>delete</button>
                  )}
                </div>
                {getErrors(validity?.items?.[index])}
              </Fragment>
            ))
          : children}
        {getErrors(validity)}
      </div>
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
