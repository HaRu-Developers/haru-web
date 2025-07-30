export interface ListFileSnsEventAssistantProps {
  snsEventId: string;
  title: string;
  updatedAt: string;
  participantCount: number;
  winnerCount: number;
  isCheckMode: boolean;
  isChecked: boolean;
  onCheckToggle: (id: string) => void;
}
