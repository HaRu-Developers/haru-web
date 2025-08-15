'use client';

import { useEffect, useRef } from 'react';

import { UseQueryOptions, UseQueryResult, useQuery } from '@tanstack/react-query';

// extra 옵션 타입 정의
type ExtraResult<TData, TError, TExtra> =
  | TExtra
  | ((queryResult: UseQueryResult<TData, TError>) => TExtra);

// useAfterQuery에서 받을 옵션 타입 정의
interface AfterQueryOptions<TData, TError, TExtra = unknown>
  extends UseQueryOptions<TData, TError, TData> {
  /**
   * 쿼리 실행 여부를 제어하는 플래그
   * → false면 쿼리 실행도, 콜백 실행도 전혀 하지 않음
   */
  enabled: boolean;
  /**
   * 쿼리가 성공했을 때 실행되는 콜백
   * → 동일한 데이터에 대해서는 중복 실행되지 않음
   */
  onSuccess?: (data: TData) => void;
  /**
   * 쿼리가 실패했을 때 실행되는 콜백
   * → 동일한 에러에 대해서는 중복 실행되지 않음
   */
  onError?: (error: TError) => void;
  /**
   * 추가 결과를 제공하는 옵션
   * - select와 달리 data는 유지함, ui에서 사용할 부분을 미리 정리해두는 역할
   * - 직접 값(TExtra)을 주거나
   * - queryResult를 가공하는 함수 형태로 제공 가능
   */
  extra?: ExtraResult<TData, TError, TExtra>;
}

// TODO: add examples here

/**
 * useAfterQuery
 *
 * React Query의 useQuery를 감싸서 확장한 커스텀 훅
 * 주요 기능:
 * - enabled 플래그로 쿼리 실행/콜백 여부 제어
 * - 동일한 데이터/에러에 대해 콜백 중복 호출 방지
 * - 쿼리 결과를 기반으로 한 extra 데이터 반환
 */
export function useAfterQuery<TData = unknown, TError = Error, TExtra = unknown>({
  enabled,
  onSuccess,
  onError,
  extra,
  ...queryOptions
}: AfterQueryOptions<TData, TError, TExtra>): UseQueryResult<TData, TError> & {
  extra?: TExtra;
} {
  // 이전 데이터와 에러를 저장할 ref
  const prevDataRef = useRef<TData | undefined>(undefined);
  const prevErrorRef = useRef<TError | undefined>(undefined);

  // React Query의 useQuery 실행
  // 전달받은 queryOptions와 enabled를 합쳐 실행
  const queryResult = useQuery<TData, TError>({
    ...queryOptions,
    enabled,
  });

  /**
   * 성공 시 콜백 실행
   * - enabled가 true일 때만 작동
   * - 이전 데이터(prevDataRef)와 현재 데이터(queryResult.data)가 다를 때만 실행
   */ useEffect(() => {
    if (!enabled) return;
    if (queryResult.isSuccess && onSuccess) {
      if (prevDataRef.current !== queryResult.data) {
        onSuccess(queryResult.data);
        prevDataRef.current = queryResult.data;
      }
    }
  }, [enabled, queryResult.isSuccess, queryResult.data, onSuccess]);

  /**
   * 에러 시 콜백 실행
   * - enabled가 true일 때만 작동
   * - 이전 에러(prevErrorRef)와 현재 에러(queryResult.error)가 다를 때만 실행
   */
  useEffect(() => {
    if (!enabled) return;
    if (queryResult.isError && onError) {
      if (prevErrorRef.current !== queryResult.error) {
        onError(queryResult.error);
        prevErrorRef.current = queryResult.error;
      }
    }
  }, [enabled, queryResult.isError, queryResult.error, onError]);

  /**
   * queryResult에 extra 필드 추가해서 반환
   * - extra가 함수면 queryResult를 인자로 실행해 결과 반환
   * - 값이면 그대로 반환
   */
  return {
    ...queryResult,
    extra:
      typeof extra === 'function'
        ? (extra as (qr: UseQueryResult<TData, TError>) => TExtra)(queryResult)
        : extra,
  };
}
