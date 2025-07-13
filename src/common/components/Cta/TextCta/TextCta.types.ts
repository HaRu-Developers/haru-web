import { PlusIconsState } from '@icons/PlusIcons/PlusIcons.types';

export enum TextCtaType {
  AI_MEETING_MANAGER = 'AI_MEETING_MANAGER',
  SNS_EVENT_ASSISTANT = 'SNS_EVENT_ASSISTANT',
  TEAM_MOOD_TRACKER = 'TEAM_MOOD_TRACKER',
}

export interface TextCtaConfig {
  iconState: PlusIconsState;
  color: string;
}

export interface TextCtaProps {
  type: TextCtaType;
  onClick: () => void;
}
