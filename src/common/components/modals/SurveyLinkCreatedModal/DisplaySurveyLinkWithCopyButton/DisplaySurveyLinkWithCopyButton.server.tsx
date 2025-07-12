import FeatureTabIcons from '@icons/FeatureTabIcons/FeatureTabIcons';
import { FeatureTabIconsState } from '@icons/FeatureTabIcons/FeatureTabIcons.types';

import { DisplaySurveyLinkWithCopyButtonProps } from './DisplaySurveyLinkWithCopyButton.types';

const DisplaySurveyLinkWithCopyButton = ({ surveyLink }: DisplaySurveyLinkWithCopyButtonProps) => {
  // TODO: 임의로 토스트 구현해두었음.
  // GPT 통한 자아실현 ,, 추후 hook 등으로 분리할 필요가 있어보입니다.
  const showToast = (message: string) => {
    const toast = document.createElement('div');
    toast.textContent = '설문 링크가 클립보드에 복사되었습니다!';
    toast.style.position = 'fixed';
    toast.style.bottom = '40px';
    toast.style.left = '50%';
    toast.style.transform = 'translateX(-50%)';
    toast.style.background = 'rgba(0,0,0,0.8)';
    toast.style.color = '#fff';
    toast.style.padding = '12px 24px';
    toast.style.borderRadius = '8px';
    toast.style.fontSize = '16px';
    toast.style.zIndex = '9999';
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.5s';

    document.body.appendChild(toast);

    // Fade in
    setTimeout(() => {
      toast.style.opacity = '1';
    }, 2);

    // Fade out
    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => {
        document.body.removeChild(toast);
      }, 500);
    }, 1500);
  };
  const handleCopy = () => {
    navigator.clipboard.writeText(surveyLink);
    showToast('설문 링크가 클립보드에 복사되었습니다!');
  };
  return (
    <div className="w-320pxr h-38pxr space-x-10pxr border-stroke-200 rounded-7pxr px-14pxr py-8pxr flex items-center justify-center border bg-white">
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
