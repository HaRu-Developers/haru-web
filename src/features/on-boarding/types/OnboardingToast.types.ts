export enum OnboardingToastType {
  SUCCESS_INVITE = 'SUCCESS_INVITE',
  SUCCESS_SNS_ACCOUNT = 'SUCCESS_SNS_ACCOUNT',
}

export interface OnboardingToastItem {
  type: OnboardingToastType;
  snsAccount?: string; // type이 SUCCESS_SNS_ACCOUNT일 떄 표시할 계정 이름
}
