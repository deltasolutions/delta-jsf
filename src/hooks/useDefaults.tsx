import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect';
import { FieldProps } from 'src';

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
