import { OnboardingIconsState } from '@icons/OnboardingIcons/OnboardingIcons.types';

export enum Position {
  TOP_LEFT = 'TOP_LEFT',
  TOP_RIGHT = 'TOP_RIGHT',
  BOTTOM_LEFT = 'BOTTOM_LEFT',
  BOTTOM_RIGHT = 'BOTTOM_RIGHT',
}

export interface Feature {
  title: string;
  description: string;
  icon: OnboardingIconsState;
  position: Position;
}
