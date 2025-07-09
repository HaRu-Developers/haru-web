import { CtaIconsState } from '@icons/Cta/CtaIcons.types';
import { PlusIconsState } from '@icons/PlusIcons/PlusIcons.types';

export enum ImageCtaType {
  AI_MEETING_MANAGER = 'AI_MEETING_MANAGER',
  SNS_EVENT_ASSISTANT = 'SNS_EVENT_ASSISTANT',
  TEAM_MOOD_TRACKER = 'TEAM_MOOD_TRACKER',
}

export interface ImageCtaConfig {
  title: string;
  color: string;
  ctaIconState: CtaIconsState;
  plusIconState: PlusIconsState;
  marginBottom: string;
}

export interface ImageCtaProps {
  type: ImageCtaType;
  onClick: () => void;
}
