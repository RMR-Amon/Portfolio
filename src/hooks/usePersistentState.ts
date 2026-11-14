import { useCallback, useState } from 'react';

/** useState that is mirrored to localStorage. Storage failures are ignored. */
export function usePersistentState<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw === null ? initial : (JSON.parse(raw) as T);
    } catch {
      return initial;
    }
  });

  const update = useCallback(
    (next: T) => {
      setValue(next);
      try {
        localStorage.setItem(key, JSON.stringify(next));
      } catch {
        /* private mode / storage disabled */
      }
    },
    [key],
  );

  return [value, update] as const;
}
