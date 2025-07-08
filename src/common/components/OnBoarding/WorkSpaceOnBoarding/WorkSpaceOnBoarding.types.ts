import { OnboardingIconsState } from '@icons/OnboardingIcons/OnboardingIcons.types';

export enum Position {
  TOP_LEFT = 'top-left',
  TOP_RIGHT = 'top-right',
  BOTTOM_LEFT = 'bottom-left',
  BOTTOM_RIGHT = 'bottom-right',
}

export interface Feature {
  title: string;
  description: string;
  icon: OnboardingIconsState;
  position: Position;
}
