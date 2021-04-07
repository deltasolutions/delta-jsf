import React from 'react';
import { Validity } from 'src/models';

export interface ErrorListProps {
  validity?: Validity;
}

export const ErrorList = ({ validity }: ErrorListProps) => {
  const errors = validity?.errors ?? [];
  if (errors.length < 1) {
    return null;
  }
  return (
    <div className="error">
      {errors.map(e => (
        <div key={e}>{e}</div>
      ))}
    </div>
  );
};
