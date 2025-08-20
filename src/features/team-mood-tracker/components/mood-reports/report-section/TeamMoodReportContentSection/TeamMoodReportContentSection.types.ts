import { Dispatch, SetStateAction } from 'react';

export interface TeamMoodReportContentSectionProps {
  moodTrackerHashedId: string;
  setCopyHandler: Dispatch<SetStateAction<() => void>>;
}
