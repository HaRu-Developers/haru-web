import { useQuery } from '@tanstack/react-query';

import queryKeys from '@common/constants/query-key.constants';

import { fetchRecentDocuments } from '@common/apis/gnb-left/get/fetchRecentDocuments';

/**
 * gnb left에서 워크 스페이스의 최근 조회 파일 가져오는 훅
 */
const useFetchRecentDocuments = (workspaceId: number | null) => {
  return useQuery({
    queryKey: workspaceId
      ? queryKeys.workspaces.recentDocuments(workspaceId).queryKey
      : ['workspaces', 'recentDocuments', 'no-workspace'], // fallback key
    queryFn: () => fetchRecentDocuments({ workspaceId }),
    enabled: !!workspaceId,
  });
};

export default useFetchRecentDocuments;
