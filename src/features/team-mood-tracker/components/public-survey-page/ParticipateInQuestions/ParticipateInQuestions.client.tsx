'use client';

import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { SurveyQuestionTypeOnPost } from '@api/team-mood-tracker/apis.types';
import { useViewSurveyQuestion } from '@api/team-mood-tracker/get/queries/useViewSurveyQuestion';

import InputSurveyQuestion from '@common/components/inputs/input-survey/InputSurveyQuestion/InputSurveyQuestion.client';
import { SurveySituation } from '@common/components/inputs/input-survey/types/input-survey.common.types';

import {
  useSetQuestionsFromApiFormat,
  useSetSurveyComponentUsingSituation,
  useSurveyQuestion,
} from '@features/team-mood-tracker/hooks/stores/useSurveyQuestionStore';

import TeamMoodTrackerFilePageSectionSkeleton from '@features/team-mood-tracker/components/skeletons/TeamMoodTrackerFilePageSectionSkeleton/TeamMoodTrackerFilePageSectionSkeleton.server';

interface TeamMoodSurveyQuestionSectionProps {
  moodTrackerHashedId: string;
}

const ParticipateInQuestions = ({ moodTrackerHashedId }: TeamMoodSurveyQuestionSectionProps) => {
  const { data: surveyQuestionResponse, isLoading } = useViewSurveyQuestion(moodTrackerHashedId);
  const setQuestionsFromApi = useSetQuestionsFromApiFormat();
  const questions = useSurveyQuestion();

  const setSituation = useSetSurveyComponentUsingSituation();

  useEffect(() => {
    setSituation(SurveySituation.PARTICIPATING_SURVEY);
  }, [setSituation]);

  const [isApiDataApplied, setIsApiDataApplied] = useState<boolean>(false);

  useEffect(() => {
    if (!isApiDataApplied && !isLoading && surveyQuestionResponse) {
      // API로부터 받은 질문 데이터를 상태에 저장합니다.
      setQuestionsFromApi(surveyQuestionResponse);
      // 상태가 업데이트되었음을 표시합니다.
      setIsApiDataApplied(true);
    }
  }, [surveyQuestionResponse, isApiDataApplied, isLoading, setQuestionsFromApi]);

  if (!surveyQuestionResponse || isLoading || !isApiDataApplied) {
    console.log(
      '[TEAM_MOOD_TRACKER] 설문 문항 로딩 중',
      moodTrackerHashedId,
      surveyQuestionResponse,
      isLoading,
    );
    return <TeamMoodTrackerFilePageSectionSkeleton />;
  }

  return (
    <div className="gap-y-14pxr mt-15pxr flex flex-col">
      {questions.map((question) => {
        return <InputSurveyQuestion key={question.id} questionId={question.id} />;
      })}
    </div>
  );
};

export default ParticipateInQuestions;
