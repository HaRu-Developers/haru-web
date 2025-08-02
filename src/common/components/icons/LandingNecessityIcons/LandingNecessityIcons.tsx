import clsx from 'clsx';

import { IconsCommonProps } from '@icons/types/icons.common.types';

import DisplayIcon from '@svgs/landing/LandingDisplay.svg';
import GearIcon from '@svgs/landing/LandingGear.svg';
import GraphIcon from '@svgs/landing/LandingGraph.svg';
import TalkIcon from '@svgs/landing/LandingTalk.svg';

import { LandingNecessityIconsState } from './LandingNecessityIcons.types';

const LandingNecessityIcons = ({
  state,
  className,
}: IconsCommonProps<LandingNecessityIconsState>) => {
  switch (state) {
    case LandingNecessityIconsState.DISPLAY:
      return <DisplayIcon className={clsx('h-62pxr w-62pxr', className)} />;
    case LandingNecessityIconsState.GEAR:
      return <GearIcon className={clsx('h-62pxr w-62pxr', className)} />;
    case LandingNecessityIconsState.GRAPH:
      return <GraphIcon className={clsx('h-62pxr w-62pxr', className)} />;
    case LandingNecessityIconsState.TALK:
      return <TalkIcon className={clsx('h-62pxr w-62pxr', className)} />;
    default:
      return null;
  }
};

export default LandingNecessityIcons;
