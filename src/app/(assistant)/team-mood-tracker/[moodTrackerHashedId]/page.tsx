'use client';

import { useParams, useSearchParams } from 'next/navigation';

import { GnbSection } from '@common/types/gnbs.types';

import FileCreatedInfo from '@common/components/FileCreatedInfo/FileCreatedInfo.client';
import GnbTop from '@common/components/gnbs/GnbTop/GnbTop.client';

import { filterSafeResponseList } from '@features/team-mood-tracker/utils/safe-response-list.utils';

import { useViewReportResponse } from '@features/team-mood-tracker/hooks/mutations/useViewReportResponse';
import { useViewSurveyResponse } from '@features/team-mood-tracker/hooks/mutations/useViewSurveyResponse';

import TeamMoodAnswerChartSection from '@features/team-mood-tracker/components/TeamMoodAnswerChartSection/TeamMoodAnswerChartSection.client';
import TeamMoodReportContentSection from '@features/team-mood-tracker/components/TeamMoodReportContentSection/TeamMoodReportContentSection.client';
import TeamMoodTrackerPageSkeleton from '@features/team-mood-tracker/components/TeamMoodTrackerSkeleton/TeamMoodTrackerSkeleton';
import TeamMoodReportTab from '@features/team-mood-tracker/components/tabs/TeamMoodReportTab/TeamMoodReportTab.client';
import { TeamMoodReportTabType } from '@features/team-mood-tracker/components/tabs/TeamMoodReportTab/TeamMoodReportTab.types';

const TeamMoodTrackerDetailPage = () => {
  const searchParams = useSearchParams();
  const params = useParams<{ moodTrackerHashedId: string }>();
  const moodTrackerHashedId = params.moodTrackerHashedId;

  const currentTab =
    (searchParams.get('moodTab') as TeamMoodReportTabType) ??
    TeamMoodReportTabType.TEAM_MOOD_REPORT;

  const { data: surveyResponse, isLoading: isSurveyLoading } =
    useViewSurveyResponse(moodTrackerHashedId);
  const { data: reportResponse, isLoading: isReportLoading } =
    useViewReportResponse(moodTrackerHashedId);

  const isLoading = isSurveyLoading || isReportLoading;
  const displayData = reportResponse || surveyResponse;
  const safeResponseList = filterSafeResponseList(surveyResponse?.responseList);

  const handleCopyClick = async () => {
    const reportContent = reportResponse?.report;

    if (!reportContent || reportContent.trim() === '') {
      alert('복사할 리포트 내용이 없습니다.');
      return;
    }

    try {
      await navigator.clipboard.writeText(reportContent);
      alert('리포트 내용이 클립보드에 복사되었습니다.');
    } catch (err) {
      console.error('클립보드 복사 실패:', err);
      alert('클립보드 복사에 실패했습니다.');
    }
  };

  if (isLoading) {
    return <TeamMoodTrackerPageSkeleton />;
  }

  if (
    (currentTab === TeamMoodReportTabType.ANSWER_SUMMARY && !surveyResponse) ||
    (currentTab === TeamMoodReportTabType.TEAM_MOOD_REPORT && !reportResponse)
  ) {
    return <div>데이터를 불러올 수 없습니다.</div>;
  }

  if (!displayData) return null;

  return (
    <div className="flex flex-col">
      <GnbTop section={GnbSection.CUSTOM} title={displayData.title} />
      <div className="mt-24pxr mb-10pxr w-668pxr mx-auto flex-col">
        <h1 className="text-t1-sb mb-14pxr">{displayData.title}</h1>
        <div className="text-cap2-md">
          <FileCreatedInfo
            name={displayData.creatorName}
            userId={displayData.creatorId}
            dateTime={displayData.updatedAt}
          />
        </div>
      </div>
      <div className="border-stroke-200 mb-14pxr w-full border-b border-solid bg-white">
        <div className="w-668pxr mx-auto">
          <TeamMoodReportTab
            current={currentTab}
            counts={{
              [TeamMoodReportTabType.TEAM_MOOD_REPORT]: 0,
              [TeamMoodReportTabType.ANSWER_SUMMARY]: displayData.respondentsNum,
              [TeamMoodReportTabType.SURVEY_LIST]: 0,
            }}
            handleCopyClick={handleCopyClick}
          />
        </div>
      </div>

      {currentTab === TeamMoodReportTabType.TEAM_MOOD_REPORT && reportResponse && (
        <TeamMoodReportContentSection
          suggestionList={reportResponse.suggestionList}
          report={reportResponse.report}
        />
      )}
      {currentTab === TeamMoodReportTabType.ANSWER_SUMMARY && surveyResponse && (
        <TeamMoodAnswerChartSection responses={safeResponseList} />
      )}
    </div>
  );
};

export default TeamMoodTrackerDetailPage;
