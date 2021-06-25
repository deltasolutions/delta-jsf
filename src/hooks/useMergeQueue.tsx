import { useCallback, useRef, useState } from 'react';
import { MergeFunction } from '../models';
import { clone, flatPromise, merge } from '../utils';

export const useMergeQueue = <T extends unknown>(
  initialValue: T,
  fn?: MergeFunction
) => {
  const [head, setHead] = useState<T>(initialValue);
  const lockRef = useRef<unknown>();
  const queue = useCallback(async (maybePromise: T | Promise<T>) => {
    const { current } = lockRef;
    let replacement;
    const lock = async () => {
      await current;
      const value = await flatPromise(maybePromise);
      setHead(merge(clone(head), value, fn));
      if (lockRef.current === replacement) {
        lockRef.current = undefined;
      }
    };
    lockRef.current = replacement = lock();
  }, []);
  const wait = useCallback(async () => {
    await lockRef.current;
  }, []);
  return [head, queue, wait] as const;
};
