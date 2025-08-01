'use client';

import SurveyInSite from '@common/components/box-text/SurveyInSite/SurveyInSite.server';

import MarkdownRenderer from '@features/team-mood-tracker/components/MarkdownRenderer/MarkdownRenderer.client';

interface TeamMoodReportContentSectionProps {
  suggestionList: string[];
  report: string;
}

const TeamMoodReportContentSection = ({
  suggestionList,
  report,
}: TeamMoodReportContentSectionProps) => {
  return (
    <div className="mx-auto">
      <div className="mb-26pxr">
        <SurveyInSite title="HaRu의 제안" items={suggestionList} />
      </div>

      <MarkdownRenderer content={report} />
    </div>
  );
};

export default TeamMoodReportContentSection;
