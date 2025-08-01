import SurveyInSiteSkeleton from '@common/components/box-text/SurveyInSite/SurveyInSiteSkeleton';
import GnbTopSkeleton from '@common/components/gnbs/GnbTop/GnbTopSkeleton';

import TeamMoodReportTabSkeleton from '@features/team-mood-tracker/components/tabs/TeamMoodReportTab/TeamMoodReportTabSkeleton';

/**
 * @description 팀 분위기 트래커 상세 페이지 전체에 대한 스켈레톤 UI
 */
const TeamMoodTrackerPageSkeleton = () => {
  return (
    <div className="flex flex-col">
      <GnbTopSkeleton />

      <div className="mt-24pxr mb-10pxr w-668pxr mx-auto flex-col">
        <div className="animate-bg-pulse mb-14pxr rounded-4pxr h-8 w-3/5" />
        <div className="animate-bg-pulse rounded-4pxr h-4 w-1/3" />
      </div>

      <div className="border-stroke-200 mb-14pxr w-full border-b border-solid bg-white">
        <div className="w-668pxr mx-auto">
          <TeamMoodReportTabSkeleton />
        </div>
      </div>

      <div className="w-668pxr mx-auto">
        <div className="mb-26pxr">
          <SurveyInSiteSkeleton />
        </div>
        <div className="space-y-4">
          <div className="animate-bg-pulse rounded-4pxr h-6 w-1/3" />
          <div className="space-y-2">
            <div className="animate-bg-pulse rounded-4pxr h-4 w-full" />
            <div className="animate-bg-pulse rounded-4pxr h-4 w-full" />
            <div className="animate-bg-pulse rounded-4pxr h-4 w-5/6" />
          </div>
          <div className="animate-bg-pulse rounded-4pxr h-6 w-1/4" />
          <div className="space-y-2">
            <div className="animate-bg-pulse rounded-4pxr h-4 w-full" />
            <div className="animate-bg-pulse rounded-4pxr h-4 w-4/5" />
          </div>
          <div className="animate-bg-pulse rounded-4pxr h-6 w-1/3" />
          <div className="space-y-2">
            <div className="animate-bg-pulse rounded-4pxr h-4 w-full" />
            <div className="animate-bg-pulse rounded-4pxr h-4 w-full" />
            <div className="animate-bg-pulse rounded-4pxr h-4 w-5/6" />
          </div>
          <div className="animate-bg-pulse rounded-4pxr h-6 w-1/4" />
          <div className="space-y-2">
            <div className="animate-bg-pulse rounded-4pxr h-4 w-full" />
            <div className="animate-bg-pulse rounded-4pxr h-4 w-4/5" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamMoodTrackerPageSkeleton;
