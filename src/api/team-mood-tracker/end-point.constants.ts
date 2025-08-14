export const MOOD_TRACKER_API_ENDPOINTS = {
  REPORTS: (moodTrackerHashedId: string) => `/mood-trackers/${moodTrackerHashedId}/reports`,
  RESPONSES: (moodTrackerHashedId: string) => `/mood-trackers/${moodTrackerHashedId}/responses`,
  MODIFY_TITLE: (moodTrackerHashedId: string) => `/mood-trackers/${moodTrackerHashedId}`,
  // 설문 생성 API, 같은 URI 활용하는거도 있는데 공용으로 쓰지 말고 새로 만들어서 사용하세요!
  CREATE_SURVEY: (workspaceId: string) => `mood-trackers/workspaces/${workspaceId}`,
  SEND_EMAIL: (moodTrackerHashedId: string) => `/mood-trackers/${moodTrackerHashedId}/emails`,
} as const;

export const TEAM_MOOD_TRACKER_PAGE_ROUTES = {
  /**
   * 팀 분위기 트래커 다운로드 페이지
   * @param workspaceId 워크스페이스 ID
   * @param moodTrackerHashedId 팀 무드 트래커 해시 ID
   */
  DOWNLOAD: (workspaceId: string, moodTrackerHashedId: string) =>
    `/workspace/${workspaceId}/team-mood-tracker/${moodTrackerHashedId}/download`,
} as const;
