export enum FileType {
  AI_MANAGER = 'AI_MANAGER',
  TEAM_MOOD = 'TEAM_MOOD',
  SNS_ASSIST = 'SNS_ASSIST',
}
export interface BoxedFileProps {
  createdAt: Date;
  lastOpenedAt?: Date;
  fileImageUrl: string;
  fileType: FileType;
}
