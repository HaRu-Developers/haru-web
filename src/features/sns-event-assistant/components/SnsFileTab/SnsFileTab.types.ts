export interface TabProps {
  current: SnsFileTabType;
  counts: Partial<Record<SnsFileTabType, number>>;
}

export enum SnsFileTabType {
  PARTICIPANT_LIST = 'PARTICIPANT_LIST',
  WINNER_LIST = 'WINNER_LIST',
  SNS_LINK = 'SNS_LINK',
}
