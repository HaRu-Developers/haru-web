import { clsx } from 'clsx';

import { SurveyInfoProps } from './SurveyInfo.types';

const SurveyInfo = ({ title, content, className }: SurveyInfoProps) => {
  return (
    <div
      className={clsx('gap-3pxr flex w-167 flex-col rounded-xl bg-gray-700 px-8 py-4', className)}
    >
      <div className="text-t5-sb flex h-8 items-center text-black">{title}</div>
      <div className="text-b3-rg whitespace-pre-line text-black">{content}</div>
    </div>
  );
};

export default SurveyInfo;
