import { createQueryKeyStore } from '@lukemorales/query-key-factory';

// 도메인(기능)별로 키를 그룹화합니다.
const queryKeys = createQueryKeyStore({
  workspaces: {
    // 매개변수가 없는 키는 null로 정의합니다.
    all: null,
    myWorkspaces: null,
    // 매개변수가 있는 키는 함수로 정의합니다.
    detail: (workspaceId: string) => [workspaceId],
    members: (workspaceId: string) => [workspaceId, 'members'],
    recentDocuments: (workspaceId: string) => [workspaceId, 'recentDocuments'],
    search: (workspaceId: string, title: string) => [workspaceId, 'search', title],
    calendar: (workspaceId: number, start: Date, end: Date) => [
      workspaceId,
      'calendar',
      start,
      end,
    ],
  },
  meetings: {
    all: null,
    create: ['meetingMinutes', 'create'],
    detail: (meetingId: string) => ['meetingMinutes', 'detail', meetingId],
    list: (workspaceId: string) => ['meetingMinutes', 'list', workspaceId],
    downloadLink: (meetingId: string) => ['meetingMinutes', 'downloadLink', meetingId],
    speechQuestion: (meetingId: string) => ['meetingMinutes', 'speechQuestion', meetingId],
    end: (meetingId: string) => ['meetingMinutes', 'end', meetingId],
    editTitle: (meetingId: string) => ['meetingMinutes', 'editTitle', meetingId],
    editProceeding: (meetingId: string) => ['meetingMinutes', 'editProceeding', meetingId],
  },

  moodTracker: {
    all: null,
    detail: (moodTrackerHashedId: string) => [moodTrackerHashedId],
    report: (moodTrackerHashedId: string) => [moodTrackerHashedId, 'report'],
  },

  user: {
    // 매개변수가 없는 키는 null로 정의합니다.
    all: null,
    // 매개변수가 있는 키는 함수로 정의합니다.
    detail: () => ['user', 'detail'],
    edit: () => ['user', 'edit'],
  },
});

export default queryKeys;
