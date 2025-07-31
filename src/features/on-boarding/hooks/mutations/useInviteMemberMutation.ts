import { useMutation, useQueryClient } from '@tanstack/react-query';

import queryKeys from '@common/constants/query-key.constants';

import { InviteMembersRequestDto } from '@features/on-boarding/types/apis.types';

import { inviteMembers } from '@features/on-boarding/apis/post/invite-member';

/**
 * 워크스페이스에 멤버를 초대하기 위한 커스텀 Mutation 훅
 */

export const useInviteMembersMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: InviteMembersRequestDto) => inviteMembers(data),

    onSuccess: (data, variables) => {
      console.log('멤버 초대 성공:', data);

      queryClient.invalidateQueries({
        ...queryKeys.workspaces.members(variables.workspaceId),
      });
    },
    onError: (error) => {
      console.error('멤버 초대 실패:', error);
    },
  });
};
