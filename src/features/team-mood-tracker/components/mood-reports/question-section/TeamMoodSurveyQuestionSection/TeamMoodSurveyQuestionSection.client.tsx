'use client';

import { useViewSurveyQuestion } from '@api/team-mood-tracker/get/queries/useViewSurveyQuestion';

import SurveyInfo from '@common/components/box-text/SurveyInfo/SurveyInfo.server';
import InputSurveyQuestion from '@common/components/inputs/input-survey/InputSurvey/InputSurvey.client';
import {
  InputSurveyQuestionType,
  SurveySituation,
} from '@common/components/inputs/input-survey/types/input-survey.common.types';

import { TeamMoodTrackerSurveyQuestionType } from '@features/team-mood-tracker/constants/question.constants';

import TeamMoodTrackerFilePageSectionSkeleton from '@features/team-mood-tracker/components/skeletons/TeamMoodTrackerFilePageSectionSkeleton/TeamMoodTrackerFilePageSectionSkeleton.server';

interface TeamMoodSurveyQuestionSectionProps {
  moodTrackerHashedId: string;
}
const TeamMoodSurveyQuestionSection = ({
  moodTrackerHashedId,
}: TeamMoodSurveyQuestionSectionProps) => {
  const { data, isLoading } = useViewSurveyQuestion(moodTrackerHashedId);

  if (!data || isLoading) {
    console.log('[TEAM_MOOD_TRACKER] 설문 문항 로딩 중', moodTrackerHashedId, data, isLoading);
    return <TeamMoodTrackerFilePageSectionSkeleton />;
  }

  return (
    <div className="w-668pxr mx-auto">
      <SurveyInfo title={data.title} content={data.description} />
      <div className="gap-y-14pxr mt-15pxr flex flex-col">
        {/* TODO: type 통일 필요 .. assertion은 사용되서는 안됩니다 ㅠㅠ */}
        {data.questionList.map((question) => {
          let options: string[] = [];

          // switch 문을 사용해 question.type에 따라 타입을 좁힙니다.
          switch (question.type) {
            case TeamMoodTrackerSurveyQuestionType.MULTIPLE_CHOICE:
              // 이 블록 안에서 question은 MULTIPLE_CHOICE 타입으로 확정됩니다.
              options = question.multipleChoiceList.map((choice) => choice.content);
              break; // case마다 break를 잊지 마세요.

            case TeamMoodTrackerSurveyQuestionType.CHECKBOX_CHOICE:
              // 이 블록 안에서 question은 CHECKBOX_CHOICE 타입으로 확정됩니다.
              options = question.checkboxChoiceList.map((choice) => choice.content);
              break;

            case TeamMoodTrackerSurveyQuestionType.SUBJECTIVE:
              // 이 블록 안에서 question은 SUBJECTIVE 타입으로 확정됩니다.
              // 주관식은 선택지가 없으므로 빈 배열을 할당합니다.
              options = [];
              break;
          }
          return (
            <InputSurveyQuestion
              key={question.questionId}
              questionTitle={question.questionTitle}
              questionType={question.type as unknown as InputSurveyQuestionType}
              multipleOrCheckboxOptions={options}
              surveyComponentUsingSituation={SurveySituation.VIEW_SURVEY_QUESTIONS}
            />
          );
        })}
      </div>
    </div>
  );
};

export default TeamMoodSurveyQuestionSection;
