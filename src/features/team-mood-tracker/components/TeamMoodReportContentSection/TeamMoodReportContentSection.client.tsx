'use client';

import MarkdownContent from '@common/components/MarkdownContent/MarkdownContent.server';
import SurveyInSite from '@common/components/box-text/SurveyInSite/SurveyInSite.server';

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

      <div className="w-668pxr">
        <MarkdownContent content={report} />
      </div>
    </div>
  );
};

export default TeamMoodReportContentSection;
