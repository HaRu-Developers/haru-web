import { useMutation } from '@tanstack/react-query';

import { submitSurvey } from '@api/team-mood-tracker/post/apis/submit-survey';

import { CommonUseMutationParams } from '@common/types/mutation-params.types';

export const useSubmitSurvey = ({ onSuccess }: CommonUseMutationParams) => {
  return useMutation({
    mutationFn: submitSurvey,
    onSuccess: onSuccess,
  });
};
