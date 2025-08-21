/**
 * @description TeamMoodReportTab 컴포넌트의 스켈레톤 UI
 */

const TeamMoodReportTabSkeleton = () => {
  return (
    <div className="py-13pxr flex h-14 w-full shrink-0 items-center justify-between bg-white">
      {/* 탭 영역 스켈레톤 */}
      <div className="gap-9pxr flex items-center">
        <div className="animate-bg-pulse rounded-4pxr h-6 w-24" />
        <div className="animate-bg-pulse rounded-4pxr h-6 w-24" />
        <div className="animate-bg-pulse rounded-4pxr h-6 w-24" />
      </div>

      {/* 버튼 영역 스켈레톤 */}
      <div className="gap-12pxr flex items-center">
        <div className="animate-bg-pulse h-8 w-8 rounded-full" />
        <div className="animate-bg-pulse rounded-4pxr h-8 w-20" />
      </div>
    </div>
  );
};

export default TeamMoodReportTabSkeleton;
