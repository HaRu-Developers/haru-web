'use client';

import { FileType } from '@common/types/file-type.enum';

import SurveyInSite from '@common/components/box-text/SurveyInSite/SurveyInSite.server';
import MarkdownContent from '@common/components/mark-down-content/MarkdownContent.server';

import { TeamMoodReportContentSectionProps } from './TeamMoodReportContentSection.types';

const TeamMoodReportContentSection = ({
  suggestionList,
  report,
}: TeamMoodReportContentSectionProps) => {
  return (
    <div className="mx-auto">
      <div className="mb-26pxr">
        <SurveyInSite title="HaRu의 제안" items={suggestionList} />
      </div>

      <div className="w-668pxr">
        <MarkdownContent variant={FileType.TEAM_MOOD_TRACKER} content={report} />
      </div>
    </div>
  );
};

export default TeamMoodReportContentSection;
