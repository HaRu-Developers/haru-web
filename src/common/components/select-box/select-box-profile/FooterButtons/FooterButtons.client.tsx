'use client';

import GnbLogout from '@svgs/component-set/GnbLogoutIcon.svg';
import Plus from '@svgs/component-set/PlusIcon.svg';

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
        className="flex h-7 cursor-pointer items-center justify-center gap-[3px] rounded-[7px] bg-gray-700 px-2 py-1.5"
      >
        <Plus height="16" width="16" />
        <span className="text-[13px] leading-[130%] font-medium tracking-[-0.26px] text-gray-300 not-italic">
          워크스페이스 추가
        </span>
      </button>
      <button onClick={handleLogout} className="flex cursor-pointer items-center gap-[3px]">
        <GnbLogout height="16" width="16" />
        <span className="text-xs leading-[130%] font-medium tracking-[-0.24px] text-gray-400 not-italic">
          로그아웃
        </span>
      </button>
    </div>
  );
};

export default FooterButtons;
