import { ApiErrorBody } from '@common/types/api.common.types';

import queryKeys from '@common/constants/query-key.constants';

import { ApiError } from '@common/errors/ApiError';

import { useAfterQuery } from '@common/hooks/queries/useAfterQuery';

import { Workspace } from '../../api.types';
import fetchMyWorkspaces from '../apis/fetchMyWorkspaces';

/**
 * 내 워크 스페이스 리스트를 가져오는 훅
 */
const useFetchMyWorkspaces = () => {
  return useAfterQuery<
    { result: Workspace[] }, // TData
    ApiError<ApiErrorBody>, // TError
    Workspace[] // TExtra
  >({
    queryKey: queryKeys.workspaces.myWorkspaces.queryKey,
    queryFn: () => fetchMyWorkspaces(),
    enabled: true,
    retry: false,
    throwOnError: true,
    extra: (queryResult) => queryResult.data?.result ?? [],
  });
};

export default useFetchMyWorkspaces;
