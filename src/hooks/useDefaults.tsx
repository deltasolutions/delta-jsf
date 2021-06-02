import { FieldProps } from 'src';
import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect';

export const useDefaults = (props: FieldProps) => {
  const {
    value,
    onValue,
    schema: { default: defaultValue }
  } = props;

  useIsomorphicLayoutEffect(() => {
    if (!value && defaultValue) {
      onValue?.(defaultValue);
    }
  }, [value]);
};
