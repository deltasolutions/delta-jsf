import React from 'react';
import { TemplateProps } from '../../models';

export function PanicTemplate({ schema, children }: TemplateProps) {
  return (
    <div className="djsf-panic">
      {children}
      <pre>
        <code>{JSON.stringify(schema, null, 2)}</code>
      </pre>
    </div>
  );
}
