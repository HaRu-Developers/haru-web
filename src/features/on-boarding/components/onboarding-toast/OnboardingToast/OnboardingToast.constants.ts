import { OnboardingToastType } from '@features/on-boarding/types/OnboardingToast.types';

export const OnboardingToastLabels = {
  [OnboardingToastType.SUCCESS_INVITE]: '성공적으로 초대 메일을 보냈습니다.',
  [OnboardingToastType.SUCCESS_SNS_ACCOUNT]: (sns: string) =>
    `${sns} 계정이 성공적으로 연동되었습니다.`,
} as const;
