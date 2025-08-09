import { useEffect, useState } from 'react';

function useDebounce<T>(value: T, delay = 300): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer); // value 변경 시 이전 타이머 취소(초기화를 해 줘야함!)
  }, [value, delay]);

  return debounced;
}

export default useDebounce;
