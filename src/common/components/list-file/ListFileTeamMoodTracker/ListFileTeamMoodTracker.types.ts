export interface ListFileTeamMoodTrackerProps {
  surveyId: string;
  title: string;
  createdAt: string;
  dueDate: string;
  respondentsNum: number;
  isCheckMode: boolean;
  isChecked: boolean;
  onCheckToggle: (id: string) => void;
}
