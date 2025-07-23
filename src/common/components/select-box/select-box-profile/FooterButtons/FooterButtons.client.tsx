'use client';

import PlusIcons from '@icons/PlusIcons/PlusIcons';
import { PlusIconsState } from '@icons/PlusIcons/PlusIcons.types';
import ProfileDropdownIcons from '@icons/ProfileDropdownIcons/ProfileDropdownIcons';
import { ProfileDropdownIconsState } from '@icons/ProfileDropdownIcons/ProfileDropdownIcons.types';

const FooterButtons = () => {
  const handleEditProfile = () => {
    console.log('프로필 설정 버튼 클릭');
  };

  const handleLogout = () => {
    console.log('로그아웃 버튼 클릭');
  };

  return (
    <div className="flex w-full items-center justify-between">
      <button
        onClick={handleEditProfile}
        className="border-stroke-200 gap-3pxr rounded-7pxr flex h-7 items-center justify-center border border-solid bg-white px-2 py-1.5"
      >
        <ProfileDropdownIcons state={ProfileDropdownIconsState.PROFILE} />
        <span className="text-cap1-md text-gray-300">프로필 설정</span>
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
