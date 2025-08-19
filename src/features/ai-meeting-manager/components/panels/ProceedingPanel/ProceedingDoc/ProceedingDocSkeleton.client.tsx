const ProceedingDocSkeleton = () => {
  return (
    <div className="gap-34pxr flex flex-col items-start">
      {Array.from({ length: 3 }, (_, idx) => (
        <div key={idx} className="py-12pxr gap-17pxr flex flex-col items-start">
          {/* 제목 */}
          <div className="h-18pxr w-574pxr animate-bg-pulse rounded" />
          {/* 내용 */}
          <div className="h-16pxr w-817pxr animate-bg-pulse rounded" />
          <div className="h-16pxr w-817pxr animate-bg-pulse rounded" />
          <div className="h-16pxr w-679pxr animate-bg-pulse rounded" />
        </div>
      ))}
    </div>
  );
};

export default ProceedingDocSkeleton;
