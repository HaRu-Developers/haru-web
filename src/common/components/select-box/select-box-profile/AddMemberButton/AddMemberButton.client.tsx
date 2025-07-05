'use client';

import ProfileAdd from '@svgs/component-set/profileAdd.svg';

const AddMemberButton = () => {
  const handleAddMember = () => {
    console.log('팀원 추가 버튼 클릭');
  };

  return (
    <button
      onClick={handleAddMember}
      className="border-stroke-200 flex h-7 cursor-pointer items-center justify-center gap-[3px] rounded-[7px] border border-solid bg-white px-2 py-1.5"
    >
      <ProfileAdd height="16" width="16" />
      <span className="text-cap1-md text-gray-400">팀원 추가</span>
    </button>
  );
};

export default AddMemberButton;
