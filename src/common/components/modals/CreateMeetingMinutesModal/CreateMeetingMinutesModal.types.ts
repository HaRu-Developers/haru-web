export interface CreateMeetingMinutesModalProps {
  onClose: () => void;
  onNextStep: (meetingId: string) => void; // meetingId 전달
  workspaceId: string;
}
