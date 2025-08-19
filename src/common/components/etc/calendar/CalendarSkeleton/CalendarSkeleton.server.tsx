/**
 * @description Calendar 컴포넌트의 스켈레톤 UI
 */
const CalendarSkeleton = () => {
  return (
    <div className="flex w-full flex-col justify-center">
      <div className="w-1030pxr mb-16pxr flex items-center justify-between">
        {/* Title Skeleton */}
        <div className="h-24pxr w-90pxr animate-bg-pulse rounded-8pxr" />

        {/* Controls Skeleton */}
        <div className="h-24pxr w-84pxr animate-bg-pulse rounded-8pxr" />
      </div>
      <div className="w-1030pxr h-756pxr animate-bg-pulse rounded-16pxr"></div>
    </div>
  );
};

export default CalendarSkeleton;
