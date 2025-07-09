export interface ListFileTeamMoodTrackerProps {
  surveyId: number;
  title: string;
  createdAt: string;
  dueDate: string;
  respondentsNum: number;
  isCheckMode: boolean;
  isChecked: boolean;
  onCheckToggle: (id: number) => void;
}
