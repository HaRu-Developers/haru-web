import { useCallback } from 'react';

import { notFound } from 'next/navigation';
import { useRouter } from 'next/navigation';

import { ApiErrorBody } from '@common/types/api.common.types';

import { API_ERROR_CODES } from '@common/constants/api-error-codes.constants';
import queryKeys from '@common/constants/query-key.constants';
import { ROUTES } from '@common/constants/routes.constants';

import { ApiError } from '@common/errors/ApiError';

import { useAfterQuery } from '@common/hooks/queries/useAfterQuery';

import { User } from '../../api.types';
import { fetchUserDetail } from '../apis/fetchUserDetail';

/**
 * gnb left에서 워크 스페이스의 최근 조회 파일 가져오는 훅
 */
const useFetchUserDetail = (opts?: { enabled?: boolean }) => {
  const router = useRouter();

  const handleError = useCallback(
    (error: ApiError<ApiErrorBody>) => {
      // 워크스페이스 자체가 없거나 권한 없음 → 404로
      if (error.code === API_ERROR_CODES.MEMBER.NOT_FOUND) {
        router.replace(ROUTES.NOT_FOUND); // notFound() 대신 클라 라우팅
      }
    },
    [router],
  );

  // Hydrate된 데이터가 있어 추가 네트워크 요청 없이 바로 캐시 데이터 사용
  return useAfterQuery<
    {
      result: User;
    }, // TData
    ApiError<ApiErrorBody>, // TError
    User // TExtra
  >({
    queryKey: queryKeys.user.detail().queryKey,
    queryFn: () => fetchUserDetail(),
    retry: false,
    enabled: opts?.enabled ?? true,
    onError: handleError,
    extra: (queryResult) => queryResult.data?.result ?? ({} as User),
  });
};

export default useFetchUserDetail;
