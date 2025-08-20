import SurveyInSiteSkeleton from '@common/components/box-text/SurveyInSite/SurveyInSiteSkeleton';

import InputFileTitleSkeleton from '@common/skeletons/InputFileTitleSkeleton/InputFileTitleSkeleton.server';

import TeamMoodReportTabSkeleton from '@features/team-mood-tracker/components/mood-reports/report-section/TeamMoodReportTab/TeamMoodReportTabSkeleton';
import QuestionsSkeleton from '@features/team-mood-tracker/components/skeletons/QuestionsSkeleton/QuestionsSkeleton.server';

const TeamMoodTrackerFilePageSectionSkeleton = () => {
  return (
    <div className="w-668pxr gap-y-26pxr my-64pxr mx-auto flex flex-col items-center">
      <InputFileTitleSkeleton />
      <TeamMoodReportTabSkeleton />
      <SurveyInSiteSkeleton />
      <QuestionsSkeleton />
    </div>
  );
};

export default TeamMoodTrackerFilePageSectionSkeleton;
