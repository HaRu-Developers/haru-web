import clsx from 'clsx';

import { IconsCommonProps } from '@icons/types/icons.common.types';

import AddProfileIcon from '@svgs/profile-dropdown/AddProfileIcon.svg';
import LogoutIcon from '@svgs/profile-dropdown/LogoutIcon.svg';
import ProfileIcon from '@svgs/profile-dropdown/ProfileIcon.svg';

import { ProfileDropdownIconsState } from './ProfileDropdownIcons.types';

const ProfileDropdownIcons = ({
  state,
  className,
}: IconsCommonProps<ProfileDropdownIconsState>) => {
  switch (state) {
    case ProfileDropdownIconsState.LOGOUT:
      return <LogoutIcon className={clsx('w-[16px h-[16px]', className)} />;
    case ProfileDropdownIconsState.ADD_PROFILE:
      return <AddProfileIcon className={clsx('w-[16px h-[16px]', className)} />;
    case ProfileDropdownIconsState.PROFILE:
      return <ProfileIcon className={clsx('w-[16px h-[16px]', className)} />;
    default:
      return null;
  }
};

export default ProfileDropdownIcons;
