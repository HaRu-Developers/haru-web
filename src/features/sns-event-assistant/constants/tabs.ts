export enum SnsFileTabType {
  PARTICIPANT_LIST = 'PARTICIPANT_LIST',
  WINNER_LIST = 'WINNER_LIST',
  SNS_LINK = 'SNS_LINK',
}

export const SnsFileTabLabels: Record<SnsFileTabType, string> = {
  [SnsFileTabType.PARTICIPANT_LIST]: '참여자 리스트',
  [SnsFileTabType.WINNER_LIST]: '당첨자 리스트',
  [SnsFileTabType.SNS_LINK]: 'SNS 링크',
};
