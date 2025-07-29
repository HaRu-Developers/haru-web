'use client';

import { ChangeEvent, useRef, useState } from 'react';

import OnboardingIcons from '@icons/OnboardingIcons/OnboardingIcons';
import { OnboardingIconsState } from '@icons/OnboardingIcons/OnboardingIcons.types';

import MoveToNextButton from '@common/components/buttons/48px/MoveToNextButton/MoveToNextButton.client';
import { MoveToNextButtonWidth } from '@common/components/buttons/48px/MoveToNextButton/MoveToNextButton.types';

import { useOnboardingActions } from '@features/on-boarding/hooks/stores/useOnBoardingStore';

const OnBoardingImageStep = () => {
  const { setImage, nextStep } = useOnboardingActions();
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleNext = () => {
    nextStep();
  };

  return (
    <div className="flex flex-col">
      <p className="text-t2-bd mb-6pxr whitespace-pre-line">{`워크스페이스의 \n 대표 사진을 등록해 주세요.`}</p>
      <p className="text-b2-rg mb-44pxr text-gray-200">
        아이콘을 클릭해 이미지를 업로드할 수 있어요.
      </p>

      <div
        onClick={() => fileInputRef.current?.click()}
        className="h-76pxr w-76pxr p-8pxr border-stroke-100 rounded-9pxr mb-141pxr flex cursor-pointer items-center justify-center border border-solid"
      >
        <div className="w-66pxr h-66pxr p-3pxr rounded-8pxr flex items-center justify-center hover:bg-gray-600">
          {preview ? (
            <img src={preview} alt="preview" className="rounded-8pxr h-full w-full object-cover" />
          ) : (
            <OnboardingIcons state={OnboardingIconsState.WORKSPACE_DEFAULT} />
          )}
        </div>
      </div>

      <input
        type="file"
        accept="image/*"
        className="hidden"
        ref={fileInputRef}
        onChange={handleImageChange}
      />

      <MoveToNextButton onClick={handleNext} width={MoveToNextButtonWidth.WIDTH_414} />
    </div>
  );
};

export default OnBoardingImageStep;
