import { ApiErrorBody } from '@common/types/api.common.types';

import queryKeys from '@common/constants/query-key.constants';

import { ApiError } from '@common/errors/ApiError';

import { useAfterQuery } from '@common/hooks/queries/useAfterQuery';

import { WorkspaceDetail } from '../../api.types';
import fetchWorkspaceDetail from '../apis/fetchWorkspaceDetail';

const DEFAULT_WORKSPACE_DETAIL: WorkspaceDetail = {
  title: '',
  imageUrl: null,
  members: [],
};

/**
 * 내 워크 스페이스 리스트를 가져오는 훅
 */
const useFetchWorkspaceDetail = (workspaceId: string) => {
  return useAfterQuery<
    { result: WorkspaceDetail }, // TData
    ApiError<ApiErrorBody>, // TError
    WorkspaceDetail // TExtra
  >({
    queryKey: queryKeys.workspaces.detail(workspaceId).queryKey,
    queryFn: () => fetchWorkspaceDetail({ workspaceId }),
    enabled: !!workspaceId,
    retry: false,
    extra: (queryResult) => queryResult.data?.result ?? DEFAULT_WORKSPACE_DETAIL,
  });
};

export default useFetchWorkspaceDetail;
