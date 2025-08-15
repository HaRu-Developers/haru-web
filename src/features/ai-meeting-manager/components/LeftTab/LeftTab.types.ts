export interface LeftTabProps {
  current: LeftTabType;
}

export enum LeftTabType {
  MEETING_PROCEEDING = 'MEETING_PROCEEDING',
  MEETING_VOICE_LOG = 'MEETING_VOICE_LOG',
}
