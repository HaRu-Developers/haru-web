import { useMutation, useQueryClient } from '@tanstack/react-query';

import queryKeys from '@common/constants/query-key.constants';

import { CreateWorkspaceRequestDto } from '@features/on-boarding/types/apis.types';

import { createWorkspace } from '@features/on-boarding/apis/post/create-workspace';

/**
 * 워크스페이스 생성을 위한 useMutation 커스텀 훅
 */

export const useCreateWorkspaceMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (workspaceData: CreateWorkspaceRequestDto) => createWorkspace(workspaceData),

    onSuccess: (data) => {
      console.log('워크스페이스 생성 성공:', data.result);
      // 성공 시 'workspaces' 쿼리를 무효화하여
      // 워크스페이스 목록을 다시 불러오도록 할 수 있습니다.
      queryClient.invalidateQueries({ queryKey: queryKeys.workspaces._def });
    },

    onError: (error) => {
      console.error('워크스페이스 생성 실패:', error);
    },
  });
};
