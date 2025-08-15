'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import clsx from 'clsx';

import LeftGnbIcons from '@icons/LeftGnbIcons/LeftGnbIcons';

import { GnbSection } from '@common/types/gnbs.types';

import {
  GnbLeftNavItemIconState,
  GnbSectionLabels,
  GnbSectionPaths,
} from '@common/constants/gnbs.constants';

import { NavItemProps } from './NavItem.types';

const NavItem = ({ item, workspaceId }: NavItemProps) => {
  const pathname = usePathname();

  const route = GnbSectionPaths(workspaceId)[item];
  const isCurrent = item === GnbSection.MAIN ? pathname === route : pathname.startsWith(route);

  const isDisabled = !workspaceId;

  return (
    <Link
      href={route}
      className={clsx(
        'h-38pxr rounded-10pxr flex items-center gap-2 self-stretch p-3 transition-colors duration-150',
        {
          'text-t6-sb bg-gray-600 text-black': isCurrent,
          'hover:bg-gray-600': !isCurrent && !isDisabled, // disabled면 hover 제거
          'pointer-events-none': isDisabled, // 클릭 차단
          'cursor-pointer': !isDisabled,
        },
      )}
    >
      <LeftGnbIcons state={GnbLeftNavItemIconState[item]} />
      <span className="text-b3-rg text-gray-200">{GnbSectionLabels[item]}</span>
    </Link>
  );
};

export default NavItem;
