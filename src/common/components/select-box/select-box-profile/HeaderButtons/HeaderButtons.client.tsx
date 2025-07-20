'use client';

import ProfileDropdownIcons from '@icons/ProfileDropdownIcons/ProfileDropdownIcons';
import { ProfileDropdownIconsState } from '@icons/ProfileDropdownIcons/ProfileDropdownIcons.types';

const HeaderButtons = () => {
  const handleWorkSpaceSetting = () => {
    console.log('워크 스페이스 설정 버튼 클릭');
  };

  const handleAddMember = () => {
    console.log('팀원 추가 버튼 클릭');
  };

  return (
    <div className="gap-6pxr flex">
      <button
        onClick={handleWorkSpaceSetting}
        className="border-stroke-200 gap-3pxr rounded-7pxr flex h-7 cursor-pointer items-center justify-center border border-solid bg-white px-2 py-1.5"
      >
        <ProfileDropdownIcons state={ProfileDropdownIconsState.SETTING} />
        <span className="text-cap1-md text-gray-300">워크스페이스 설정</span>
      </button>
      <button
        onClick={handleAddMember}
        className="border-stroke-200 gap-3pxr rounded-7pxr flex h-7 cursor-pointer items-center justify-center border border-solid bg-white px-2 py-1.5"
      >
        <ProfileDropdownIcons state={ProfileDropdownIconsState.ADD_PROFILE} />
        <span className="text-cap1-md text-gray-300">팀원 추가</span>
      </button>
    </div>
  );
};

export default HeaderButtons;
