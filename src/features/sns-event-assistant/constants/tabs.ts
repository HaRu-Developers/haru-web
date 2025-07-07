export enum TabType {
  PARTICIPANT_LIST = 'participant-list',
  WINNER_LIST = 'winner-list',
  SNS_LINK = 'sns-link',
}

export const TabLabels: Record<TabType, string> = {
  [TabType.PARTICIPANT_LIST]: '참여자 리스트',
  [TabType.WINNER_LIST]: '당첨자 리스트',
  [TabType.SNS_LINK]: 'SNS 링크',
};
