'use client';

import { ButtonsCommonProps } from '@buttons/types/buttons.common.types';

const MoveToHaRuLandingPageButton = ({ onClick }: ButtonsCommonProps) => {
  return (
    <button
      onClick={onClick}
      className="text-bt3-sb w-119pxr h-30pxr rounded-100pxr flex items-center justify-center bg-gray-100 text-white"
    >
      HaRu로 이동하기
    </button>
  );
};

export default MoveToHaRuLandingPageButton;
