'use client';

import { useSubmitSurvey } from '@api/team-mood-tracker/post/mutations/useSubmitSurvey';

import { useMoodTrackerHashedId } from '@common/hooks/useMoodTrackerHashedId';

import FileCreatedInfo from '@common/components/FileCreatedInfo/FileCreatedInfo.client';

import TeamMoodSurveyQuestionSection from '@features/team-mood-tracker/components/mood-reports/question-section/TeamMoodSurveyQuestionSection/TeamMoodSurveyQuestionSection.client';
import SubmitSurveyButton from '@features/team-mood-tracker/components/public-survey-page/SubmitSurveyButton/SubmitSurveyButton.client';

const PublicSurveyPage = () => {
  const { mutate: submitSurvey } = useSubmitSurvey();

  const { moodTrackerHashedId } = useMoodTrackerHashedId();
  const { title, creatorName, creatorId, updatedAt } = {
    title: '팀 분위기 트래커 설문조사',
    creatorName: '홍길동',
    creatorId: 'user123',
    updatedAt: new Date().toISOString(),
  };

  const onSurveySubmit = () => {
    // 설문 제출 로직을 여기에 구현합니다.
    console.log('설문이 제출되었습니다.');
  };

  const isSurveyValid = true;

  return (
    <div className="w-668pxr my-64pxr mx-auto flex flex-col items-center">
      {/*MAIN CONTENT*/}
      <div className="mt-24pxr mb-10pxr w-668pxr mx-auto flex-col">
        {/* InputFileTitle을 쓰는 것은 오버아키텍쳐링으로 판단되므로 span으로 구현 */}
        <span className="mb-14pxr text-t1-sb text-black">{title}</span>
        <FileCreatedInfo name={creatorName} userId={creatorId} dateTime={updatedAt} />
      </div>
      <div className="mt-23pxr flex w-full items-center justify-end">
        <SubmitSurveyButton onClick={onSurveySubmit} disabled={!isSurveyValid} />
      </div>
      <div className="w-1200pxr mt-13pxr mb-14pxr border-stroke-200 h-1 border-b" />
      <TeamMoodSurveyQuestionSection moodTrackerHashedId={moodTrackerHashedId} />
    </div>
  );
};

export default PublicSurveyPage;
