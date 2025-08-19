import { useMutation } from '@tanstack/react-query';

import { submitSurvey } from '@api/team-mood-tracker/post/apis/submit-survey';

export const useSubmitSurvey = () => {
  return useMutation({
    mutationFn: submitSurvey,
  });
};
