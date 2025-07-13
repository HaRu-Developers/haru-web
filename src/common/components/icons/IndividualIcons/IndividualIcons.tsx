import clsx from 'clsx';

import { IconsCommonProps } from '@icons/types/icons.common.types';

import CalendarIcon from '@svgs/individual/CalenderIcon.svg';
import CongratulationIcon from '@svgs/individual/CongratulationIcon.svg';
import EmailIcon from '@svgs/individual/EmailIcon.svg';
import GroupIcon from '@svgs/individual/GroupIcon.svg';
import SearchIcon from '@svgs/individual/SearchIcon.svg';
import UnderArrowIcon from '@svgs/individual/UnderArrowIcon.svg';
import UploadIcon from '@svgs/individual/UploadIcon.svg';
import WarningIcon from '@svgs/individual/WarningIcon.svg';

import { IndividualIconsState } from './IndividualIcons.types';

const IndividualIcons = ({ state, className }: IconsCommonProps<IndividualIconsState>) => {
  switch (state) {
    case IndividualIconsState.CONGRATULATE_SIGN_UP:
      return <CongratulationIcon className={clsx('h-[174.47px] w-[202.36px]', className)} />;
    case IndividualIconsState.WARNING:
      return <WarningIcon className={clsx('h-[36px] w-[36px]', className)} />;
    case IndividualIconsState.UNDER_ARROW:
      return <UnderArrowIcon className={clsx('h-[20px] w-[20px]', className)} />;
    case IndividualIconsState.SEARCH:
      return <SearchIcon className={clsx('h-[18px] w-[18px]', className)} />;
    case IndividualIconsState.CALENDAR:
      return <CalendarIcon className={clsx('h-[18px] w-[18px]', className)} />;
    case IndividualIconsState.UPLOAD:
      return <UploadIcon className={clsx('h-[24px] w-[24px]', className)} />;
    case IndividualIconsState.GROUP:
      return <GroupIcon className={clsx('h-[20px] w-[20px]', className)} />;
    case IndividualIconsState.EMAIL:
      return <EmailIcon className={clsx('h-[20px] w-[20px]', className)} />;
    default:
      return null;
  }
};

export default IndividualIcons;
