'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';

import clsx from 'clsx';

import ProfileDropdownIcons from '@icons/ProfileDropdownIcons/ProfileDropdownIcons';
import { ProfileDropdownIconsState } from '@icons/ProfileDropdownIcons/ProfileDropdownIcons.types';

import useLogout from '@api/user/hooks/mutations/useLogout';

import { ROUTES } from '@common/constants/routes.constants';

const FooterButtons = () => {
  const { mutate: logout, isPending } = useLogout();
  const handleLogout = () => {
    logout();
  };

  const { workspaceId } = useParams<{ workspaceId: string }>();

  return (
    <div className="flex w-full items-center justify-between">
      {/* Profile Modal 좌측 '프로필 설정' 버튼 */}
      <Link
        href={workspaceId ? ROUTES.MODAL.SETTING.PROFILE_SETTING(workspaceId) : '#'}
        className="border-stroke-200 gap-3pxr rounded-7pxr flex h-7 items-center justify-center border border-solid bg-white px-2 py-1.5"
      >
        <ProfileDropdownIcons state={ProfileDropdownIconsState.PROFILE} />
        <span className="text-cap1-md text-gray-300">프로필 설정</span>
      </Link>
      {/* Profile Modal 우측 '로그아웃' 버튼 */}
      <button onClick={handleLogout} className="gap-3pxr flex items-center">
        <ProfileDropdownIcons state={ProfileDropdownIconsState.LOGOUT} />
        <span
          className={clsx(
            'text-cap2-md text-gray-400 hover:underline',
            isPending
              ? 'cursor-default'
              : 'cursor-pointer hover:decoration-gray-400 hover:decoration-solid hover:decoration-[1px] hover:underline-offset-[1px] hover:[text-decoration-skip-ink:none] hover:[text-underline-position:from-font]',
          )}
        >
          {isPending ? '로그아웃 중...' : '로그아웃'}
        </span>
      </button>
    </div>
  );
};

export default FooterButtons;
