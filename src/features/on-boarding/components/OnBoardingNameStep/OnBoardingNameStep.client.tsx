'use client';

import { useState } from 'react';

import MoveToNextButton from '@common/components/buttons/48px/MoveToNextButton/MoveToNextButton.client';
import { MoveToNextButtonWidth } from '@common/components/buttons/48px/MoveToNextButton/MoveToNextButton.types';

import { useUser } from '@features/auth/hooks/useAuthStore';
import { useOnboardingActions } from '@features/on-boarding/hooks/stores/useOnBoardingStore';

const OnBoardingNameStep = () => {
  const { setName, nextStep } = useOnboardingActions();
  const [inputName, setInputName] = useState('');

  const user = useUser();
  const { name } = user || {};

  const handleNext = () => {
    if (!inputName.trim()) return;
    const trimmedName = inputName.trim();
    setName(trimmedName);
    nextStep();
  };

  return (
    <div className="flex flex-col">
      <div>
        <p className="text-t2-bd whitespace-pre-line">{`${name} 님, 좋은 HaRu에요!\n 우선, 워크스페이스의 이름을 정해주세요.`}</p>
      </div>
      <div className="text-b2-rg mt-6pxr mb-44pxr text-gray-200">
        워크스페이스를 생성하고 팀원을 초대해 협업할 수 있어요.
      </div>

      <div className="mb-141pxr">
        <label className="text-b3-rg mb-6pxr block text-black">워크스페이스 명</label>
        <input
          className="text-b3-rg w-414pxr rounded-9pxr border-stroke-100 px-14pxr py-13pxr text-gray-black border focus:border-transparent focus:ring-2 focus:ring-[#007AFFB3] focus:outline-none"
          placeholder={`${name}님의 워크스페이스`}
          value={inputName}
          onChange={(e) => setInputName(e.target.value)}
        />
      </div>

      <MoveToNextButton
        onClick={handleNext}
        width={MoveToNextButtonWidth.WIDTH_414}
        disabled={inputName.trim().length === 0}
      />
    </div>
  );
};

export default OnBoardingNameStep;
