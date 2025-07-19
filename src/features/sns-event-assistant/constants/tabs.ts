export enum TabType {
  PARTICIPANT_LIST = 'PARTICIPANT_LIST',
  WINNER_LIST = 'WINNER_LIST',
  SNS_LINK = 'SNS_LINK',
}

export const TabLabels: Record<TabType, string> = {
  [TabType.PARTICIPANT_LIST]: '참여자 리스트',
  [TabType.WINNER_LIST]: '당첨자 리스트',
  [TabType.SNS_LINK]: 'SNS 링크',
};
