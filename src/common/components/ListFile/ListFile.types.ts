export enum MeetingRole {
  AI_MANAGER = 'AI Manager',
  TEAM_MOOD_MAKER = 'Team Mood Maker',
  SNS_ASSISTANT = 'SNS Assistant',
}

export interface MeetingItemProps {
  id: string | number;
  title: string;
  date: string;
  role: MeetingRole;
  attendees?: number; // 참여자 수
  instagramLink?: string;
  winners?: number; // 당첨자 수
  deadline?: string;
  isChecked: boolean;
  onCheck: (id: string | number) => void;
  selectionActive: boolean;
}
