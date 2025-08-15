export enum TeamMoodTrackerVisibility {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
}

export interface CreateNewTeamMoodTrackerModalOnNextStepProps {
  title: string;
  dueDate: Date;
  description: string;
  visibility: TeamMoodTrackerVisibility;
}

export interface CreateNewTeamMoodTrackerModalProps {
  onClose: () => void;
  onNextStep: (props: CreateNewTeamMoodTrackerModalOnNextStepProps) => void;
}
