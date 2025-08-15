import FeatureTabIcons from '@icons/FeatureTabIcons/FeatureTabIcons';
import { FeatureTabIconsState } from '@icons/FeatureTabIcons/FeatureTabIcons.types';

import { ToastType } from '@common/types/toast.types';

import { useToastActions } from '@common/hooks/stores/useToastStore';

import { DisplaySurveyLinkWithCopyButtonProps } from './DisplaySurveyLinkWithCopyButton.types';

const DisplaySurveyLinkWithCopyButton = ({ surveyLink }: DisplaySurveyLinkWithCopyButtonProps) => {
  const { addToast } = useToastActions();

  const handleCopy = async () => {
    await navigator.clipboard.writeText(surveyLink);
    addToast({
      text: `설문 링크가 클립보드에 복사되었습니다!`,
      type: ToastType.SUCCESS,
      duration: 3000, // 기본은 2000ms
    });
  };

  return (
    <div className="w-320pxr h-38pxr gap-x-10pxr border-stroke-200 rounded-7pxr px-14pxr py-8pxr flex items-center justify-center border bg-white">
      <input
        type="text"
        value={surveyLink}
        readOnly
        className="text-b3-rg w-262pxr overflow-hidden text-left text-ellipsis whitespace-nowrap text-gray-200"
      />
      <button onClick={handleCopy}>
        <FeatureTabIcons state={FeatureTabIconsState.COPY} />
      </button>
    </div>
  );
};

export default DisplaySurveyLinkWithCopyButton;
