import { useMutation } from '@tanstack/react-query';

import { sendEmail } from '@api/team-mood-tracker/post/apis/create-delete-survey';

export const useSendEmail = () => {
  return useMutation({
    mutationFn: sendEmail,
    // TODO: 기타 mutate handler 필요한 경우 Props로 만들기
  });
};
