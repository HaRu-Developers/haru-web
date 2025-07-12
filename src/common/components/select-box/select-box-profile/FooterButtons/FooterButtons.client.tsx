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
      <button onClick={handleAddWorkspace} className="rounded-7pxr h-7 bg-gray-700 px-2 py-1.5">
        <div className="gap-3pxr flex items-center">
          <PlusIcons state={PlusIconsState.SIZE_16_GRAY_300} />
          <span className="text-cap1-md text-gray-300">워크스페이스 추가</span>
        </div>
      </button>
      <button onClick={handleLogout} className="gap-3pxr flex items-center">
        <ProfileDropdownIcons state={ProfileDropdownIconsState.LOGOUT} />
        <span className="text-cap2-md text-gray-400 hover:underline hover:decoration-gray-400 hover:decoration-solid hover:decoration-[1px] hover:underline-offset-[1px] hover:[text-decoration-skip-ink:none] hover:[text-underline-position:from-font]">
          로그아웃
        </span>
      </button>
    </div>
  );
};

export default FooterButtons;
