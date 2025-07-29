'use client';

import Link from 'next/link';

import PlusIcons from '@icons/PlusIcons/PlusIcons';
import { PlusIconsState } from '@icons/PlusIcons/PlusIcons.types';

import { ROUTES } from '@common/constants/routes.constants';

const NewWorkspaceButton = () => {
  return (
    <Link
      className="gap-6pxr rounded-10pxr p-10pxr flex w-full items-center justify-start self-stretch"
      href={ROUTES.ONBOARDING}
    >
      <PlusIcons state={PlusIconsState.SIZE_20_PRIMARY} />
      <span className="text-primary text-cap1-md">내 워크스페이스 추가</span>
    </Link>
  );
};

export default NewWorkspaceButton;
