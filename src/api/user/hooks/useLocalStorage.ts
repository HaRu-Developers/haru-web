'use client';

import { useState } from 'react';

import { LOCAL_STORAGE_KEYS, LocalStorageValue } from '../constants/local-storage-key.constants';

/**
 * useLocalStorage 훅은 로컬 스토리지(localStorage)에 값을 저장하고 불러오는 기능을 제공합니다.
 *
 * @param key localStorage에 저장할 때 사용할 key 값
 * @param initialValue
 *
 * 초기값. localStorage에 값이 없거나, 서버 환경일 때 반환됩니다.
 *  - 첫 번째 요소: 현재 저장된 값
 *  - 두 번째 요소: 값을 저장하는 setter 함수
 *
 * @example
 * const [value, setValue] = useLocalStorage<number>('count', 0);
 * setValue(5);
 *
 * @deprecated useAuthStore 도입으로 더 이상 사용하지 않습니다.
 */
const useLocalStorage = <T>(key: LocalStorageValue, initialValue: T) => {
  // window 객체는 server 환경에서는 undefined

  const readValue = (): T => {
    if (typeof window === 'undefined') {
      return initialValue;
    }
    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch (error) {
      return initialValue;
    }
  };

  const [storedValue, setStoredValue] = useState<T>(readValue);
  /**
   * 값을 저장할 수 있도록 합니다.
   *
   * T type을 return하는 함수 또한 가능합니다.
   */
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      // Ignore write errors
    }
  };

  return [storedValue, setValue] as const;
};

/**
 * localStorage에서 토큰을 가져오는 함수
 */
export const getAccessToken = (): string => {
  if (typeof window === 'undefined') {
    return '';
  }

  try {
    return window.localStorage.getItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN) || '';
  } catch {
    return '';
  }
};

export default useLocalStorage;
