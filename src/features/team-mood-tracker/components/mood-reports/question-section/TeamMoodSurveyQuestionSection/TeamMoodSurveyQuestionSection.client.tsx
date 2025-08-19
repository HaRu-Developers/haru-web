'use client';

import { useViewSurveyQuestion } from '@api/team-mood-tracker/get/queries/useViewSurveyQuestion';

import SurveyInfo from '@common/components/box-text/SurveyInfo/SurveyInfo.server';
import InputSurvey from '@common/components/inputs/input-survey/InputSurvey/InputSurvey.client';
import { InputSurveyQuestionType } from '@common/components/inputs/input-survey/types/input-survey.common.types';

import { TeamMoodTrackerSurveyQuestionType } from '@features/team-mood-tracker/constants/question.constants';

interface TeamMoodSurveyQuestionSectionProps {
  moodTrackerHashedId: string;
}
const TeamMoodSurveyQuestionSection = ({
  moodTrackerHashedId,
}: TeamMoodSurveyQuestionSectionProps) => {
  const { data, isLoading } = useViewSurveyQuestion(moodTrackerHashedId);

  if (!data || isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <SurveyInfo title={data.title} content={data.description} />

      {/* TODO: type 통일 필요 .. assertion은 사용되서는 안됩니다 ㅠㅠ */}
      {data.questionList.map((question) => {
        let options: string[] = [];

        // switch 문을 사용해 question.type에 따라 타입을 좁힙니다.
        switch (question.type) {
          case TeamMoodTrackerSurveyQuestionType.MULTIPLE_CHOICE:
            // 이 블록 안에서 question은 MULTIPLE_CHOICE 타입으로 확정됩니다.
            options = question.multipleChoiceResponseList.map((choice) => choice.content);
            break; // case마다 break를 잊지 마세요.

          case TeamMoodTrackerSurveyQuestionType.CHECKBOX_CHOICE:
            // 이 블록 안에서 question은 CHECKBOX_CHOICE 타입으로 확정됩니다.
            options = question.checkboxChoiceResponseList.map((choice) => choice.content);
            break;

          case TeamMoodTrackerSurveyQuestionType.SUBJECTIVE:
            // 이 블록 안에서 question은 SUBJECTIVE 타입으로 확정됩니다.
            // 주관식은 선택지가 없으므로 빈 배열을 할당합니다.
            options = [];
            break;
        }
        return (
          <InputSurvey
            key={question.questionId}
            title={question.questionTitle}
            type={question.type as unknown as InputSurveyQuestionType}
            options={options}
          />
        );
      })}
    </div>
  );
};

export default TeamMoodSurveyQuestionSection;
