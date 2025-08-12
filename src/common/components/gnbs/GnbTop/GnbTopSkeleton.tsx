/**
 * @description GnbTop 컴포넌트의 스켈레톤 UI
 */

const GnbTopSkeleton = () => {
  return (
    <div className="flex w-full flex-col items-start">
      {/* 상단 제목 스켈레톤 */}
      <div className="border-b-stroke-200 h-60pxr py-13pxr flex items-center self-stretch border-b border-solid bg-white px-6">
        <div className="animate-bg-pulse rounded-4pxr h-6 w-48" />
      </div>
    </div>
  );
};

export default GnbTopSkeleton;
