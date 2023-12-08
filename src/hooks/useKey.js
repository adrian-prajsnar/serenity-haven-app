import { useEffect } from 'react';

export function useKey(key, action) {
  useEffect(() => {
    const callback = e => e.key.toLowerCase() === key.toLowerCase() && action();

    document.addEventListener('keydown', callback);
    return () => document.removeEventListener('keydown', callback);
  }, [key, action]);
}
