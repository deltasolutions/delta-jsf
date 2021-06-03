import React from 'react';
import { TemplateProps } from 'src/models';
import { ErrorList } from './ErrorList';

export function createFieldTemplate(topClassName: string) {
  return function ({ children, schema, validity }: TemplateProps) {
    return (
      <div className={topClassName}>
        {schema.title && <div className="title">{schema.title}</div>}
        <div className="content">{children}</div>
        <ErrorList validity={validity} />
      </div>
    );
  };
}
