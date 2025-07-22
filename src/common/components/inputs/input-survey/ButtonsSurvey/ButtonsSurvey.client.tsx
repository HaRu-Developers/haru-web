'use client';

import { ButtonsSetveyProps } from './ButtonsSurvey.types';

const ButtonsSurvey = ({ onDelete, onToggle }: ButtonsSetveyProps) => {
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
        {/* 안보여서 그냥 추가 했습니다 */}
        <label className="relative inline-flex cursor-pointer items-center">
          <input type="checkbox" className="peer sr-only" onClick={onToggle} />
          <div className="peer peer-checked:bg-primary h-22pxr w-44pxr rounded-1000pxr after:start-2pxr after:top-2pxr after:h-18pxr after:w-18pxr after:border-stroke-200 peer-checked:after:translate-x-22pxr rtl:peer-checked:after:-translate-x-22pxr relative bg-gray-600 after:absolute after:rounded-full after:border after:bg-white after:transition-transform after:duration-200 after:content-[''] peer-checked:after:border-white"></div>
        </label>
      </div>
    </div>
  );
};

export default ButtonsSurvey;
