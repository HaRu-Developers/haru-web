import { SVGProps } from 'react';

export enum ImageCtaType {
  AI_MEETING = 'AI_MEETING',
  SNS_EVENT = 'SNS_EVENT',
  TEAM_TRACKER = 'TEAM_TRACKER',
}

export interface ImageCtaConfig {
  color: string;
  title: string;
  icon: React.FC<SVGProps<SVGSVGElement>>;
  iconWidth: string;
  iconHeight: string;
  marginBottom: string;
}

export interface ImageCtaProps {
  type: ImageCtaType;
  onClick: () => void;
}
