import { ButtonsCommonProps } from '../types/buttons.common.types';

export enum FeatureButtonType {
  MEETING = 'MEETING',
  EVENT = 'EVENT',
  MOODTRACKER = 'MOODTRACKER',
  CALENDAR = 'CALENDAR',
}

export interface FeatureButtonProps extends ButtonsCommonProps {
  name: string;
  iconType: FeatureButtonType;
  onButtonClick?: (iconType: FeatureButtonType) => void;
}
