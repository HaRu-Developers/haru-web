export interface ListFileSnsEventAssistantProps {
  snsEventId: string;
  title: string;
  participantCount: number;
  winnerCount: number;
  snsLink: string;
  updatedAt: Date;
  isCheckMode?: boolean;
  isChecked?: boolean;
  onCheckToggle: (id: string) => void;
}
