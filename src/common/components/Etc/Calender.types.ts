export enum FileType {
  AI_MANAGER = 'AI_MANAGER',
  SNS_ASSIST = 'SNS_ASSIST',
  TEAM_MOOD = 'TEAM_MOOD',
}

export interface File {
  name: string;
  type: FileType;
}
export interface CalendarProps {
  date: Date;
  files?: File[];
}
