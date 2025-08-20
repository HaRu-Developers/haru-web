'use client';

import { useState } from 'react';

import { useParams, useRouter, useSearchParams } from 'next/navigation';

import { TEAM_MOOD_TRACKER_PAGE_ROUTES } from '@api/team-mood-tracker/end-point.constants';
import { useSurveyBasicInfo } from '@api/team-mood-tracker/get/queries/useSurveyBasicInfo';

import { GnbSection } from '@common/types/gnbs.types';

import FileCreatedInfo from '@common/components/FileCreatedInfo/FileCreatedInfo.client';
import GnbTop from '@common/components/gnbs/GnbTop/GnbTop.client';

import TeamMoodAnswerChartSection from '@features/team-mood-tracker/components/mood-reports/answer-section/TeamMoodAnswerChartSection/TeamMoodAnswerChartSection.client';
import TeamMoodTrackerDetailPageTitle from '@features/team-mood-tracker/components/mood-reports/common/TeamMoodTrackerDetailPageTitle/TeamMoodTrackerDetailPageTitle.client';
import TeamMoodSurveyQuestionSection from '@features/team-mood-tracker/components/mood-reports/question-section/TeamMoodSurveyQuestionSection/TeamMoodSurveyQuestionSection.client';
import TeamMoodReportContentSection from '@features/team-mood-tracker/components/mood-reports/report-section/TeamMoodReportContentSection/TeamMoodReportContentSection.client';
import TeamMoodReportTab from '@features/team-mood-tracker/components/mood-reports/report-section/TeamMoodReportTab/TeamMoodReportTab.client';
import { TeamMoodReportTabType } from '@features/team-mood-tracker/components/mood-reports/report-section/TeamMoodReportTab/TeamMoodReportTab.types';
import TeamMoodTrackerPageSkeleton from '@features/team-mood-tracker/components/skeletons/TeamMoodTrackerSkeleton/TeamMoodTrackerSkeleton';
import TeamMoodToast from '@features/team-mood-tracker/components/toasts/TeamMoodToast/TeamMoodToast.client';

const TeamMoodTrackerDetailPage = () => {
  const searchParams = useSearchParams();

  const params = useParams<{
    workspaceId: string;
    moodTrackerHashedId: string;
  }>();
  const workspaceId = params.workspaceId;
  const moodTrackerHashedId = params.moodTrackerHashedId;

  const router = useRouter();

  const [copyHandler, setCopyHandler] = useState<() => void>(() => () => {});

  /**
   * query string에서 현재 tab 정보를 가져옵니다.
   */
  const currentTab =
    (searchParams.get('moodTab') as TeamMoodReportTabType) ??
    TeamMoodReportTabType.TEAM_MOOD_REPORT;

  const { data: surveyBasicInfo, isFetching: isFetchingSurveyBasicInfo } =
    useSurveyBasicInfo(moodTrackerHashedId);

  // TODO: skeleton은 tab 단위로 수정

  const handleDownloadClick = () => {
    router.push(TEAM_MOOD_TRACKER_PAGE_ROUTES.DOWNLOAD(workspaceId, moodTrackerHashedId));
  };

  const renderTabContent = () => {
    switch (currentTab) {
      case TeamMoodReportTabType.TEAM_MOOD_REPORT:
        return (
          <TeamMoodReportContentSection
            moodTrackerHashedId={moodTrackerHashedId}
            setCopyHandler={setCopyHandler}
          />
        );
      case TeamMoodReportTabType.ANSWER_SUMMARY:
        return <TeamMoodAnswerChartSection moodTrackerHashedId={moodTrackerHashedId} />;
      case TeamMoodReportTabType.SURVEY_LIST:
        return <TeamMoodSurveyQuestionSection moodTrackerHashedId={moodTrackerHashedId} />;
      default:
        return <div>알 수 없는 탭입니다.</div>;
    }
  };

  // 설문 정보가 없거나, 해당 정보를 가져오는 중인 경우에는 스켈레톤을 표시합니다.
  if (!surveyBasicInfo || isFetchingSurveyBasicInfo) {
    return <TeamMoodTrackerPageSkeleton />;
  }

  const { title, creatorName, creatorId, updatedAt, respondentsNum } = surveyBasicInfo;

  return (
    <>
      <div className="relative flex flex-col">
        {/* 상단 GNB */}
        <GnbTop section={GnbSection.CUSTOM} title={title} />
        {/* 토스트 영역 */}
        <div className="top-100pxr absolute right-0 left-0 z-100 flex justify-center">
          <TeamMoodToast />
        </div>
        {/* MAIN CONTENT */}
        <div className="mt-24pxr mb-10pxr w-668pxr mx-auto flex-col">
          <TeamMoodTrackerDetailPageTitle
            moodTrackerHashedId={moodTrackerHashedId}
            surveyBasicInfo={surveyBasicInfo}
          />
          <FileCreatedInfo name={creatorName} userId={creatorId} dateTime={updatedAt} />
        </div>
        {/* 탭 영역 */}
        {/* TODO: 이거 그냥 마음에 안들어서 바꾸고 싶어요 @kyeoungwoon */}
        <div className="border-stroke-200 mb-14pxr w-full border-b border-solid bg-white">
          <div className="w-668pxr mx-auto">
            <TeamMoodReportTab
              current={currentTab}
              counts={{
                [TeamMoodReportTabType.TEAM_MOOD_REPORT]: 0,
                [TeamMoodReportTabType.ANSWER_SUMMARY]: respondentsNum,
                [TeamMoodReportTabType.SURVEY_LIST]: 0,
              }}
              handleCopyClick={copyHandler}
              handleDownloadClick={handleDownloadClick}
            />
          </div>
        </div>
        {renderTabContent()}
      </div>
    </>
  );
};

export default TeamMoodTrackerDetailPage;
