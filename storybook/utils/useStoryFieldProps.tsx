import { useCallback, useState } from 'react';
import { defaults } from 'src/defaults';
import { FieldError } from 'src/models';

export const useStoryFieldProps = (props, initialValue = undefined) => {
  const [value, setValue] = useState<any>(initialValue);
  const [error, setError] = useState<FieldError>({ messages: [] });
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
