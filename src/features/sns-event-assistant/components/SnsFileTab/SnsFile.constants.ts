import { SnsFileTabType } from './SnsFileTab.types';

export const SnsFileTabLabels: Record<SnsFileTabType, string> = {
  [SnsFileTabType.PARTICIPANT_LIST]: '참여자 리스트',
  [SnsFileTabType.WINNER_LIST]: '당첨자 리스트',
  [SnsFileTabType.SNS_LINK]: 'SNS 링크',
};
