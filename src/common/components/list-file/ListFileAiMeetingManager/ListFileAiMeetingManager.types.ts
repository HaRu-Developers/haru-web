export interface ListFileAiMeetingManagerProps {
  workspaceId: string;
  meetingId: string;
  title: string;
  updatedAt: string;
  isCheckMode: boolean;
  isChecked: boolean;
  onCheckToggle: (id: string) => void;
}
