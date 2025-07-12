import { ProgressBarProps } from './ProgressBar.types';

const ProgressBar = ({ progress }: ProgressBarProps) => {
  return (
    <div className="h-49pxr gap-10pxr flex w-80 flex-col">
      <div className="h-7pxr relative w-full overflow-hidden bg-gray-700">
        <div
          className="bg-primary-gradient transition-width absolute top-0 left-0 h-full duration-400"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="text-b3-md text-center text-gray-200">{progress}% 완료</p>
    </div>
  );
};

export default ProgressBar;
