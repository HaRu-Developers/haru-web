'use client';

import PlusIcons from '@icons/PlusIcons/PlusIcons';
import { PlusIconsState } from '@icons/PlusIcons/PlusIcons.types';

const NewWorkspaceButton = () => {
  const handleNewWorkspaceClick = () => {
    console.log('새 워크스페이스 생성 버튼 클릭');
  };
  return (
    <button
      className="gap-6pxr rounded-10pxr p-10pxr flex w-full items-center justify-start self-stretch"
      onClick={handleNewWorkspaceClick}
    >
      <PlusIcons state={PlusIconsState.SIZE_20_PRIMARY} />
      <span className="text-primary text-cap1-md">내 워크스페이스 추가</span>
    </button>
  );
};

export default NewWorkspaceButton;
