import { useFormManager } from 'src/hooks';
import { FormProps } from 'src/models';
import { FormManagerOptions } from 'src/models/FormManagerOptions';
import { areManagedFormProps, getFieldComponent } from 'src/utils';
import { defaults } from '../defaults';

export const Form = <T extends unknown>(props: FormProps<T>) => {
  const defaultManager = useFormManager(props as FormManagerOptions<T>);
  const targetManager = areManagedFormProps(props)
    ? props.manager
    : defaultManager;

  const {
    options: { schema, layout, registry },
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
    registry: registry ?? defaults.registry,
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
      {props.children}
    </form>
  );
};
