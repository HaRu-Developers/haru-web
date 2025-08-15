'use client';

import ToggleButton from '@buttons/22px/ToggleButton/ToggleButton.client';

import { ButtonsSetveyProps } from './ButtonsSurvey.types';

const ButtonsSurvey = ({ onDelete, onToggle, isMandatory }: ButtonsSetveyProps) => {
  const blankFunction = () => {
    return;
  };

  return (
    <div className="w-159pxr gap-14pxr text-b3-rg flex items-center justify-end">
      <button
        className="h-24pxr rounded-4pxr px-9pxr flex items-center justify-center text-gray-300 hover:bg-gray-600 hover:text-black"
        onClick={onDelete}
      >
        삭제
      </button>
      <div className="gap-6pxr flex items-center text-gray-100">
        필수
        {/*TODO: 추후 optional 영역들 조정 후에 변경 필요*/}
        <ToggleButton state={isMandatory ?? true} onToggle={onToggle ?? blankFunction} />
      </div>
    </div>
  );
};

export default ButtonsSurvey;
