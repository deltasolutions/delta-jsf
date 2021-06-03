import React, { Fragment } from 'react';
import { useArrayHandlers } from 'src/hooks';
import { TemplateProps } from 'src/models';
import { ErrorList } from './ErrorList';

export function ArrayTemplate(props: TemplateProps) {
  const { children, schema, validity } = props;
  const { handleDelete, handleAdd } = useArrayHandlers(props);

  return (
    <div className="djsf-array">
      {schema.title && <div className="title">{schema.title}</div>}
      {handleAdd && <button onClick={handleAdd}>Add</button>}
      <div className="content">
        {Array.isArray(children)
          ? [...children]?.map((child, index) => (
              <Fragment key={`array-wrap-${index}`}>
                <div className="item">
                  {child}
                  {handleDelete && (
                    <button onClick={() => handleDelete(index)}>Delete</button>
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
}
