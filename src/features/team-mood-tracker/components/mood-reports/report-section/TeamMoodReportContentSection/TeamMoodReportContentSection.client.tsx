'use client';

import { useEffect } from 'react';

import { useViewReportResponse } from '@api/team-mood-tracker/get/queries/useViewReportResponse';

import { FileType } from '@common/types/file-type.enum';

import SurveyInSite from '@common/components/box-text/SurveyInSite/SurveyInSite.server';
import MarkdownContent from '@common/components/mark-down-content/MarkdownContent.server';

import { TeamMoodTrackerToastType } from '@features/team-mood-tracker/types/TeamMoodTrackerToastStore.types';

import { useTeamMoodToastActions } from '@features/team-mood-tracker/hooks/stores/useTeamMoodTrackerToastStore';

import TeamMoodReportNoneContentSection from '@features/team-mood-tracker/components/mood-reports/report-section/TeamMoodReportNoneContentSection/TeamMoodReportNoneContentSection.server';

import { TeamMoodReportContentSectionProps } from './TeamMoodReportContentSection.types';

const TeamMoodReportContentSection = ({
  moodTrackerHashedId,
  setCopyHandler,
}: TeamMoodReportContentSectionProps) => {
  const { data: reportResponse, isFetching: isReportFetching } =
    useViewReportResponse(moodTrackerHashedId);

  const { report, suggestionList } = reportResponse || {};

  const { showCopyToast } = useTeamMoodToastActions();

  // 부모 컴포넌트로 복사 버튼 관련 로직을 전달합니다.
  useEffect(() => {
    if (reportResponse) {
      const handleCopyClick = async () => {
        const reportContent = reportResponse.report;

        if (!reportContent || reportContent.trim() === '') {
          showCopyToast({ type: TeamMoodTrackerToastType.COPY_EMPTY });
          return;
        }

        try {
          await navigator.clipboard.writeText(reportContent);
          showCopyToast({ type: TeamMoodTrackerToastType.COPY_SUCCESS });
        } catch (err) {
          console.error('클립보드 복사 실패:', err);
          showCopyToast({ type: TeamMoodTrackerToastType.COPY_EMPTY });
        }
      };

      setCopyHandler(handleCopyClick);
    }
  }, []);

  if (!suggestionList || !report || (report && report.trim() === '')) {
    return <TeamMoodReportNoneContentSection />;
  }

  // TODO: 스켈레톤으로 변경
  if (isReportFetching) {
    return <div>Loading ... </div>;
  }

  return (
    <div className="mx-auto">
      <div className="mb-2pxr">
        <SurveyInSite title="HaRu의 제안" items={suggestionList} />
      </div>

      <div className="w-668pxr">
        <MarkdownContent variant={FileType.TEAM_MOOD_TRACKER} content={report} />
      </div>
    </div>
  );
};

export default TeamMoodReportContentSection;
