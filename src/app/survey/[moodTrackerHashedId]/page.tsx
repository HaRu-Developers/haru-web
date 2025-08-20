'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { SurveyQuestionTypeOnPost } from '@api/team-mood-tracker/apis.types';
import { useSurveyBasicInfo } from '@api/team-mood-tracker/get/queries/useSurveyBasicInfo';
import { useSubmitSurvey } from '@api/team-mood-tracker/post/mutations/useSubmitSurvey';

import { ROUTES } from '@common/constants/routes.constants';

import { useMoodTrackerHashedId } from '@common/hooks/useMoodTrackerHashedId';

import FileCreatedInfo from '@common/components/FileCreatedInfo/FileCreatedInfo.client';
import SurveyInfo from '@common/components/box-text/SurveyInfo/SurveyInfo.server';

import MoveToHaRuLandingPageButton from '@features/team-mood-tracker/components/public-survey-page/MoveToHaRuLandingPageButton/MoveToHaRuLandingPageButton.client';
import ParticipateInQuestions from '@features/team-mood-tracker/components/public-survey-page/ParticipateInQuestions/ParticipateInQuestions.client';
import SubmitSurveyButton from '@features/team-mood-tracker/components/public-survey-page/SubmitSurveyButton/SubmitSurveyButton.client';
import TeamMoodTrackerFilePageSectionSkeleton from '@features/team-mood-tracker/components/skeletons/TeamMoodTrackerFilePageSectionSkeleton/TeamMoodTrackerFilePageSectionSkeleton.server';

// 공개된, 설문조사 응답 페이지 입니다.
const PublicSurveyPage = () => {
  /**
   * 사용자의 응답을 기록해두는 state 입니다.
   */
  const [surveyUserResponse, setSurveyUserResponse] = useState<SurveyQuestionTypeOnPost[]>([]);
  const [isSurveySubmitted, setIsSurveySubmitted] = useState<boolean>(false);

  const router = useRouter();
  const { mutate: submitSurvey } = useSubmitSurvey({ onSuccess: () => setIsSurveySubmitted(true) });

  const { moodTrackerHashedId } = useMoodTrackerHashedId();

  const { data: surveyBasicInfo, isFetching: isFetchingSurveyBasicInfo } =
    useSurveyBasicInfo(moodTrackerHashedId);

  // 스켈레톤
  if (isFetchingSurveyBasicInfo || !surveyBasicInfo) {
    return <TeamMoodTrackerFilePageSectionSkeleton />;
  }

  const { title, creatorName, creatorId, updatedAt } = surveyBasicInfo;

  const onSurveySubmit = () => {
    // 설문 제출 로직을 여기에 구현합니다.
    submitSurvey({ moodTrackerHashedId, surveyQuestion: surveyUserResponse });
    console.log('설문이 제출되었습니다.');
  };

  const onMoveToHaRuLandingPage = () => {
    router.push(ROUTES.LANDING);
  };

  // TODO: 설문 유효성 검사 로직을 구현해야 합니다.
  //  ex. 필수 질문에 모두 대답하였는지 여부 등
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
        {isSurveySubmitted ? (
          <MoveToHaRuLandingPageButton onClick={onMoveToHaRuLandingPage} />
        ) : (
          <SubmitSurveyButton onClick={onSurveySubmit} disabled={!isSurveyValid} />
        )}
      </div>
      <div className="w-1200pxr mt-13pxr mb-14pxr border-stroke-200 h-1 border-b" />
      {isSurveySubmitted ? (
        <SurveyInfo
          title="답변이 제출되었습니다."
          content={`응답이 성공적으로 제출되었습니다.\n소중한 시간을 내어 주셔서 감사합니다.`}
        />
      ) : (
        <ParticipateInQuestions
          moodTrackerHashedId={moodTrackerHashedId}
          setSurveyUserResponse={setSurveyUserResponse}
        />
      )}
    </div>
  );
};

export default PublicSurveyPage;
