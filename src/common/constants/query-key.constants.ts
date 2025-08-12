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
    calendar: (workspaceId: number, start: Date, end: Date) => [
      workspaceId,
      'calendar',
      start,
      end,
    ],
  },
  user: {
    // 매개변수가 없는 키는 null로 정의합니다.
    all: null,
    // 매개변수가 있는 키는 함수로 정의합니다.
    detail: () => ['user', 'detail'],
    edit: () => ['user', 'edit'],
  },
  // 다른 도메인 추가 가능 - 이후 자신에게 맞는 도메인 이름으로 추가해서 사용 하시면 됩니다.
  // snsEventAssisant: {
  //   all: null,
  // },
});

export default queryKeys;
