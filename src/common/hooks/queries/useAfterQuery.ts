import { useEffect, useRef } from 'react';

import { QueryObserverResult } from '@tanstack/react-query';

interface QueryCallbacks<TData, TError> {
  queryResult: QueryObserverResult<TData, TError>;
  enabled: boolean;
  onSuccess?: (data: TData) => void;
  onError?: (error: TError) => void;
}

/**
 * useAfterQuery
 *
 * 전달된 queryResult의 상태(isSuccess, isError)가 변경될 때마다
 * onSuccess와 onError 콜백을 실행합니다.
 * 단, useQuery의 enabled가 true일 때만 실행하며,
 * 동일한 데이터나 에러에 대해 중복 실행되지 않도록 이전 값을 비교합니다.
 */
export function useAfterQuery<TData = unknown, TError = Error>({
  queryResult,
  enabled,
  onSuccess,
  onError,
}: QueryCallbacks<TData, TError>) {
  // 이전 데이터와 에러를 저장할 ref
  const prevDataRef = useRef<TData | undefined>(undefined);
  const prevErrorRef = useRef<TError | undefined>(undefined);

  // 쿼리 성공 시, 데이터가 변경되었을 경우에만 onSuccess 실행
  useEffect(() => {
    if (!enabled) return;
    if (queryResult.isSuccess && onSuccess) {
      if (prevDataRef.current !== queryResult.data) {
        onSuccess(queryResult.data);
        prevDataRef.current = queryResult.data;
      }
    }
  }, [enabled, queryResult.isSuccess, queryResult.data, onSuccess]);

  // 쿼리 에러 시, 에러가 변경되었을 경우에만 onError 실행
  useEffect(() => {
    if (!enabled) return;
    if (queryResult.isError && onError) {
      if (prevErrorRef.current !== queryResult.error) {
        onError(queryResult.error);
        prevErrorRef.current = queryResult.error;
      }
    }
  }, [enabled, queryResult.isError, queryResult.error, onError]);
}
