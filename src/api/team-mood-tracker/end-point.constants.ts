export const MOOD_TRACKER_API_ENDPOINTS = {
  REPORTS: (moodTrackerHashedId: string) => `/mood-trackers/${moodTrackerHashedId}/reports`,
  RESPONSES: (moodTrackerHashedId: string) => `/mood-trackers/${moodTrackerHashedId}/responses`,
  MODIFY_TITLE: (moodTrackerHashedId: string) => `/mood-trackers/${moodTrackerHashedId}`,
} as const;
