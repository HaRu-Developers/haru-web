const LoadingBar = () => {
  return (
    <div className="relative h-[7px] w-80 overflow-hidden bg-gray-700">
      <div className="animate-loading-bar absolute top-0 left-0 h-full" />
    </div>
  );
};

export default LoadingBar;
