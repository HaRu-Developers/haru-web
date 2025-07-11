import { ChartContainerProps } from './ChartContainer.types';

const ChartContainer = ({ title, children }: ChartContainerProps) => {
  return (
    <div className="border-stroke-200 shadow-survey-form min-w-668pxr pt-17pxr flex shrink-0 flex-col items-start rounded-sm border border-solid px-5 pb-6">
      <div className="border-b-stroke-200 mb-5 w-full border-b pb-1.5">
        <div className="text-t5-sb font-bold">{title}</div>
      </div>
      {children}
    </div>
  );
};

export default ChartContainer;
