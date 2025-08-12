import { useMutation } from '@tanstack/react-query';

import { linkInstagram } from '@/api/on-boarding/post/apis/link-instagram';

export const useLinkInstagramMutation = () => {
  return useMutation({
    mutationFn: linkInstagram,
  });
};
