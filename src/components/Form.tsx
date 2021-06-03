import React from 'react';
import { defaults } from 'src/defaults';
import { useFormManager } from 'src/hooks';
import { FormProps } from 'src/models';
import { FormManagerOptions } from 'src/models';
import { areManagedFormProps, getFieldComponent } from 'src/utils';

export const Form = <T extends unknown>(props: FormProps<T>) => {
  const { style, className, id, children } = props ?? {};
  const defaultManager = useFormManager(props as FormManagerOptions<T>);
  const targetManager = areManagedFormProps(props)
    ? props.manager
    : defaultManager;

  const {
    options: { schema, layout, registry = defaults.registry },
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
    layout,
    registry,
    value,
    validity,
    onValue: v => {
      setValue(v);
      validate(v);
    },
    onValidity: e => {
      extendValidity(e as any);
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
