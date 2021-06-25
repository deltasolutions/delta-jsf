import React from 'react';
import { useFormManager } from '../hooks';
import { FormManagerOptions, FormProps, Validity } from '../models';
import { areManagedFormProps, getFieldComponent } from '../utils';
import { defaults } from './defaults';

export const Form = <T extends unknown>(props: FormProps<T>) => {
  const { style, className, id, children } = props ?? {};
  const defaultManager = useFormManager(props as FormManagerOptions<T>);
  const targetManager = areManagedFormProps(props)
    ? props.manager
    : defaultManager;

  const {
    options: { schema, registry = defaults.registry },
    value,
    validity,
    setValue,
    extendValidity,
    isValid,
    wait,
    submit,
    validate
  } = targetManager;

  const rootFieldProps = {
    schema,
    registry,
    value,
    validity,
    onValue: v => {
      setValue(v);
      validate(v);
    },
    onValidity: (e: Validity) => {
      extendValidity(e);
    }
  };

  const RootField = getFieldComponent(rootFieldProps);

  return (
    <form
      style={style}
      className={className}
      id={id}
      noValidate
      onSubmit={async e => {
        e.preventDefault();
        await wait();
        if (!isValid) {
          return;
        }
        submit();
      }}
    >
      <RootField {...rootFieldProps} />
      {children}
    </form>
  );
};
