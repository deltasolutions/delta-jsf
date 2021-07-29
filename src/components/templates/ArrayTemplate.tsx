import React from 'react';
import { useArrayHandlers } from '../../hooks';
import { TemplateProps } from '../../models';
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
              <div key={`array-item-${index}`} className="item">
                {child}
                {handleDelete && (
                  <button onClick={() => handleDelete(index)}>Delete</button>
                )}
              </div>
            ))
          : children}
        <ErrorList validity={validity} />
      </div>
    </div>
  );
}
