'use client';

import ProfileDropdownIcons from '@icons/ProfileDropdownIcons/ProfileDropdownIcons';
import { ProfileDropdownIconsState } from '@icons/ProfileDropdownIcons/ProfileDropdownIcons.types';

const AddMemberButton = () => {
  const handleAddMember = () => {
    console.log('팀원 추가 버튼 클릭');
  };

  return (
    <button
      onClick={handleAddMember}
      className="border-stroke-200 gap-3pxr rounded-7pxr flex h-7 cursor-pointer items-center justify-center border border-solid bg-white px-2 py-1.5"
    >
      <ProfileDropdownIcons state={ProfileDropdownIconsState.ADD_PROFILE} />
      <span className="text-cap1-md text-gray-400">팀원 추가</span>
    </button>
  );
};

export default AddMemberButton;
