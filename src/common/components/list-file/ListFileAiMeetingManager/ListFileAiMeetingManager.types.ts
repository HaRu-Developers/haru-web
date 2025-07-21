export interface ListFileAiMeetingManagerProps {
  meetingId: number;
  title: string;
  updatedAt: string;
  isCheckMode: boolean;
  isChecked: boolean;
  onCheckToggle: (id: number) => void;
}
