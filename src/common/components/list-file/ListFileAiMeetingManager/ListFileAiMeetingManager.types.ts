export interface ListFileAiMeetingManagerProps {
  meetingId: string;
  title: string;
  updatedAt: string;
  isCheckMode: boolean;
  isChecked: boolean;
  onCheckToggle: (id: string) => void;
}
