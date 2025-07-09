export enum OnboardingType {
  SHOW = 'SHOW',
  HIDE = 'HIDE',
}

export enum OnboardingState {
  DEFAULT = 'DEFAULT',
  ERROR = 'ERROR',
  APPROVAL = 'APPROVAL',
}

export enum OnboardingMode {
  DEFAULT = 'DEFAULT',
  EDITABLE = 'EDITABLE',
}
export interface OnBoardingProps {
  mode?: OnboardingMode;
  title: string;
  inputValue: string;
  placeholder?: string;
  onChange: (value: string) => void;
  type?: OnboardingType;
  message?: string;
  state?: OnboardingState;
}
