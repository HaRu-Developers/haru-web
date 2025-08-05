import { createQueryKeyStore } from '@lukemorales/query-key-factory';

// 도메인(기능)별로 키를 그룹화합니다.
const queryKeys = createQueryKeyStore({
  workspaces: {
    // 매개변수가 없는 키는 null로 정의합니다.
    all: null,
    // 매개변수가 있는 키는 함수로 정의합니다.
    detail: (workspaceId: string) => [workspaceId],
    members: (workspaceId: string) => [workspaceId, 'members'],
    recentDocuments: (workspaceId: string) => [workspaceId, 'recentDocuments'],
  },

  moodTracker: {
    all: null,
    detail: (moodTrackerHashedId: string) => [moodTrackerHashedId],
    report: (moodTrackerHashedId: string) => [moodTrackerHashedId, 'report'],
  },
});

export default queryKeys;
