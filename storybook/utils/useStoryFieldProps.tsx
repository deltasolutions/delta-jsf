import { useCallback, useState } from 'react';
import { defaults, Validity } from 'src';

export const useStoryFieldProps = (props, initialValue: any = undefined) => {
  const [value, setValue] = useState<any>(initialValue);
  const [error, setError] = useState<Validity>({ errors: [] });
  const onValue = useCallback(v => {
    setValue(v);
    props?.onValue?.(v);
  }, []);
  const onError = useCallback(e => {
    setError(e);
    props?.onError?.(e);
  }, []);
  return { value, error, onValue, onError, registry: defaults.registry };
};
