import clsx from 'clsx';

import { IconsCommonProps } from '@icons/types/icons.common.types';

import CalendarIcon from '@svgs/individual/CalenderIcon.svg';
import CongratulationIcon from '@svgs/individual/CongratulationIcon.svg';
import EmailIcon from '@svgs/individual/EmailIcon.svg';
import GroupIcon from '@svgs/individual/GroupIcon.svg';
import SearchIcon from '@svgs/individual/SearchIcon.svg';
import TrashOutlineIcon from '@svgs/individual/TrashOutlineIcon.svg';
import UnderArrowIcon from '@svgs/individual/UnderArrowIcon.svg';
import UploadIcon from '@svgs/individual/UploadIcon.svg';
import WarningIcon from '@svgs/individual/WarningIcon.svg';

import { IndividualIconsState } from './IndividualIcons.types';

const IndividualIcons = ({ state, className }: IconsCommonProps<IndividualIconsState>) => {
  switch (state) {
    case IndividualIconsState.CONGRATULATE_SIGN_UP:
      return <CongratulationIcon className={clsx('h-174.47pxr w-202.36pxr', className)} />;
    case IndividualIconsState.WARNING:
      return <WarningIcon className={clsx('h-36pxr w-36pxr', className)} />;
    case IndividualIconsState.UNDER_ARROW:
      return <UnderArrowIcon className={clsx('h-20pxr w-20pxr', className)} />;
    case IndividualIconsState.SEARCH:
      return <SearchIcon className={clsx('h-18pxr w-18pxr', className)} />;
    case IndividualIconsState.SEARCH_SIZE_20:
      return <SearchIcon className={clsx('h-20pxr w-20pxr', className)} />;
    case IndividualIconsState.CALENDAR_SIZE_16:
      return <CalendarIcon className={clsx('h-16pxr w-16pxr', className)} />;
    case IndividualIconsState.CALENDAR_SIZE_18:
      return <CalendarIcon className={clsx('h-18pxr w-18pxr', className)} />;
    case IndividualIconsState.UPLOAD:
      return <UploadIcon className={clsx('h-24pxr w-24pxr', className)} />;
    case IndividualIconsState.GROUP:
      return <GroupIcon className={clsx('h-20pxr w-20pxr', className)} />;
    case IndividualIconsState.EMAIL:
      return <EmailIcon className={clsx('h-20pxr w-20pxr', className)} />;
    case IndividualIconsState.TRASH_OUTLINE:
      return <TrashOutlineIcon className={clsx('h-18pxr w-18pxr', className)} />;
    default:
      return null;
  }
};

export default IndividualIcons;
