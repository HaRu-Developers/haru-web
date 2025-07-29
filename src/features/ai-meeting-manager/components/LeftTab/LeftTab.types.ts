export interface LeftTabProps {
  current: LeftTabType;
}

export enum LeftTabType {
  MEETING_SUMMARY = 'MEETING_SUMMARY',
  MEETING_VOICE_LOG = 'MEETING_VOICE_LOG',
}
