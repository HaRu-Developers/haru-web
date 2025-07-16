import { SurveryInfoProps } from './SurveyInfo.types';

const SurveryInfo = ({ title, content }: SurveryInfoProps) => {
  return (
    <div className="flex w-167 flex-col rounded-xl bg-gray-700 px-8 py-4">
      <h2 className="text-t5-sb mb-8-5pxr text-black">{title}</h2>
      <div className="text-b3-rg leading-relaxed whitespace-pre-line text-black">{content}</div>
    </div>
  );
};

export default SurveryInfo;
