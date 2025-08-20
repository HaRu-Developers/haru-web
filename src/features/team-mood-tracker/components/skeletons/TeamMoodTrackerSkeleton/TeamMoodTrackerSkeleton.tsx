import SurveyInSiteSkeleton from '@common/components/box-text/SurveyInSite/SurveyInSiteSkeleton';
import GnbTopSkeleton from '@common/components/gnbs/GnbTop/GnbTopSkeleton';

import InputFileTitleSkeleton from '@common/skeletons/InputFileTitleSkeleton/InputFileTitleSkeleton.server';

import TeamMoodReportTabSkeleton from '@features/team-mood-tracker/components/mood-reports/report-section/TeamMoodReportTab/TeamMoodReportTabSkeleton';
import QuestionsSkeleton from '@features/team-mood-tracker/components/skeletons/QuestionsSkeleton/QuestionsSkeleton.server';

/**
 * @description 팀 분위기 트래커 상세 페이지 전체에 대한 스켈레톤 UI
 */
const TeamMoodTrackerPageSkeleton = () => {
  return (
    <div className="flex flex-col">
      <GnbTopSkeleton />
      <InputFileTitleSkeleton />

      <div className="border-stroke-200 mb-14pxr w-full border-b border-solid bg-white">
        <div className="w-668pxr mx-auto">
          <TeamMoodReportTabSkeleton />
        </div>
      </div>

      <div className="w-668pxr mx-auto">
        <div className="mb-26pxr">
          <SurveyInSiteSkeleton />
        </div>
        <QuestionsSkeleton />
      </div>
    </div>
  );
};

export default TeamMoodTrackerPageSkeleton;
