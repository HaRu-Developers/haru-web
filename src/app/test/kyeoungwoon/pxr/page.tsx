const PxrTestPage = () => {
  return (
    <div className="flex flex-col gap-y-4">
      <p className="text-16pxr">안녕하세요!</p>
      <p className="text-32pxr">안녕하세요!</p>
      <div className="w-320pxr h-16pxr bg-blue-500">넓이 320px에 높이 16px 입니다.!</div>
      <div className="w-480pxr h-16pxr bg-blue-500">이건 넓이 480px 높이 16px 이에요!</div>
      <div className="w-480pxr h-32pxr text-16pxr bg-blue-500">w-480pxr h-32pxr text-16pxr</div>
      <div className="w-480pxr h-32pxr text-32pxr bg-blue-500">w-480pxr h-32pxr text-32pxr</div>
      <div className="w-480pxr h-32pxr text-28pxr rounded-16pxr bg-blue-500">
        이건 넓이 480px 높이 32px 이에요!
      </div>
      <div className="w-480pxr h-32pxr text-t1-sb rounded-[16px] bg-blue-500">
        이건 넓이 480px 높이 32px 이에요!
      </div>
    </div>
  );
};

export default PxrTestPage;
