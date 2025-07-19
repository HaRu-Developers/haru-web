'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import clsx from 'clsx';

import LeftGnbIcons from '@icons/LeftGnbIcons/LeftGnbIcons';

import { GnbLeftNavItemIconState, GnbSectionLabels, GnbSectionPaths } from '@common/constants/gnbs';

import { NavItemProps } from './NavItem.types';

const NavItem = ({ item }: NavItemProps) => {
  const pathname = usePathname();
  const route = GnbSectionPaths[item];
  const isCurrent = pathname?.startsWith(route) ?? false;

  return (
    <Link
      href={route}
      className={clsx(
        'h-38pxr rounded-10pxr flex cursor-pointer items-center gap-2 self-stretch p-3 transition-colors duration-150',
        {
          'text-t6-sb bg-gray-600 text-black': isCurrent,
          'hover:bg-gray-600': !isCurrent,
        },
      )}
    >
      <LeftGnbIcons state={GnbLeftNavItemIconState[item]} />
      <span className="text-b3-rg text-gray-200">{GnbSectionLabels[item]}</span>
    </Link>
  );
};

export default NavItem;
