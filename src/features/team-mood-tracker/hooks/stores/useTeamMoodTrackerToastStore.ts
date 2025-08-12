import { useShallow } from 'zustand/shallow';

import TeamMoodTrackerToastStore from '@features/team-mood-tracker/stores/team-mood-tracker-toast-store';

export const useTeamMoodToastInfo = () =>
  TeamMoodTrackerToastStore(
    useShallow((state) => ({
      copyToast: state.copyToast,
    })),
  );

export const useTeamMoodToastActions = () => TeamMoodTrackerToastStore((state) => state.actions);
