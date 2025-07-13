export interface ListFileSnsEventAssistantProps {
  snsEventId: number;
  title: string;
  updatedAt: string;
  participantCount: number;
  winnerCount: number;
  isCheckMode: boolean;
  isChecked: boolean;
  onCheckToggle: (id: number) => void;
}
