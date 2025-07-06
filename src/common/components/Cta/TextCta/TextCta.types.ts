export enum TextCtaType {
  AI_MEETING = 'AI_MEETING',
  SNS_EVENT = 'SNS_EVENT',
  TEAM_TRACKER = 'TEAM_TRACKER',
}

export interface TextCtaProps {
  type: TextCtaType;
  onClick: () => void;
}
