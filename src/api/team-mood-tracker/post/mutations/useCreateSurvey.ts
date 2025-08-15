import { useMutation } from '@tanstack/react-query';

import { createNewSurvey } from '@api/team-mood-tracker/post/apis/create-delete-survey';

interface UseCreateSurveyProps {
  onMutate?: () => void;
  onSettled?: () => void;
}

export const useCreateSurvey = ({ onMutate, onSettled }: UseCreateSurveyProps) => {
  return useMutation({
    mutationFn: createNewSurvey,
    // TODO: 기타 mutate handler 필요한 경우 Props로 만들기
    onMutate: onMutate,
    onSettled: onSettled,
  });
};
