'use client';

import { useViewReportResponse } from '@api/team-mood-tracker/get/queries/useViewReportResponse';

import { FileType } from '@common/types/file-type.enum';

import SurveyInSite from '@common/components/box-text/SurveyInSite/SurveyInSite.server';
import MarkdownContent from '@common/components/mark-down-content/MarkdownContent.server';

import TeamMoodReportNoneContentSection from '@features/team-mood-tracker/components/mood-reports/report-section/TeamMoodReportNoneContentSection/TeamMoodReportNoneContentSection.server';

import { TeamMoodReportContentSectionProps } from './TeamMoodReportContentSection.types';

const TeamMoodReportContentSection = ({
  moodTrackerHashedId,
}: TeamMoodReportContentSectionProps) => {
  // TODO: parent component에서 분리한 부분입니다. PARENT component를 수정하여야 합니다.
  const { data: reportResponse, isFetching: isReportFetching } =
    useViewReportResponse(moodTrackerHashedId);

  const { report, suggestionList } = reportResponse || {};

  if (!suggestionList || !report || (report && report.trim() === '')) {
    return <TeamMoodReportNoneContentSection />;
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
