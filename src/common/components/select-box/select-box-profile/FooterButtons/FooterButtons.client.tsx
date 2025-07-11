'use client';

import PlusIcons from '@icons/PlusIcons/PlusIcons';
import { PlusIconsState } from '@icons/PlusIcons/PlusIcons.types';
import ProfileDropdownIcons from '@icons/ProfileDropdownIcons/ProfileDropdownIcons';
import { ProfileDropdownIconsState } from '@icons/ProfileDropdownIcons/ProfileDropdownIcons.types';

const FooterButtons = () => {
  const handleAddWorkspace = () => {
    console.log('워크스페이스 추가 버튼 클릭');
  };

  const handleLogout = () => {
    console.log('로그아웃 버튼 클릭');
  };

  return (
    <div className="flex w-full items-center justify-between">
      <button
        onClick={handleAddWorkspace}
        className="gap-3pxr rounded-7pxr flex h-7 cursor-pointer items-center justify-center bg-gray-700 px-2 py-1.5"
      >
        <PlusIcons state={PlusIconsState.SIZE_16_GRAY_300} />
        <span className="text-13pxr leading-[130%] font-medium tracking-[-0.26px] text-gray-300 not-italic">
          워크스페이스 추가
        </span>
      </button>
      <button onClick={handleLogout} className="flex cursor-pointer items-center gap-[3px]">
        <ProfileDropdownIcons state={ProfileDropdownIconsState.LOGOUT} />
        <span className="text-12pxr leading-[130%] font-medium tracking-[-0.24px] text-gray-400 not-italic hover:underline hover:decoration-gray-400 hover:decoration-solid hover:decoration-[1px] hover:underline-offset-[1px] hover:[text-decoration-skip-ink:none] hover:[text-underline-position:from-font]">
          로그아웃
        </span>
      </button>
    </div>
  );
};

export default FooterButtons;
