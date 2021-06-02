import React, { Fragment } from 'react';
import { TemplateProps } from 'src/models';
import { ErrorList } from './ErrorList';

export const ArrayTemplate = ({
  children,
  schema,
  validity,
  value: values,
  onValue
}: TemplateProps) => {
  const { additionalItems, maxItems, minItems } = schema ?? {};

  const mayDelete = (values?.length ?? 0) > (minItems ?? 0);
  const handleDeletion = (itemIdex: number) =>
    onValue?.(values?.filter((d, i) => i !== itemIdex) ?? []);

  // https://json-schema.org/understanding-json-schema/reference/array.html#addtional-items
  // additionalItems in default true
  const mayAdd =
    (values?.length ?? 0) < (maxItems ?? Infinity) && additionalItems !== false;

  const handleAddition = () =>
    onValue?.(Array.isArray(values) ? [...values, null] : [null]);

  return (
    <div className="djsf-array">
      {schema.title && <div className="title">{schema.title}</div>}
      {mayAdd && <button onClick={handleAddition}>Add</button>}
      <div className="content">
        {Array.isArray(children)
          ? [...children]?.map((child, index) => (
              <Fragment key={`array-wrap-${index}`}>
                <div className="item">
                  {child}
                  {mayDelete && (
                    <button onClick={() => handleDeletion(index)}>
                      Delete
                    </button>
                  )}
                </div>
                <ErrorList validity={validity?.items?.[index]} />
              </Fragment>
            ))
          : children}
        <ErrorList validity={validity} />
      </div>
    </div>
  );
};
