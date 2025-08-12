/**
 * @description SurveyInSite 컴포넌트의 스켈레톤 UI
 */
const SurveyInSiteSkeleton = () => {
  return (
    <div className="rounded-12pxr px-32pxr py-16pxr flex w-167 flex-col bg-gray-700">
      <div className="animate-bg-pulse rounded-4pxr w-98pxr mb-17pxr h-18pxr" />

      <div className="ml-1.5 flex flex-col gap-2">
        <div className="animate-bg-pulse rounded-4pxr h-4 w-full" />
        <div className="animate-bg-pulse rounded-4pxr h-4 w-11/12" />
      </div>
    </div>
  );
};

export default SurveyInSiteSkeleton;
