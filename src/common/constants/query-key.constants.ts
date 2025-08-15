import { createQueryKeyStore } from '@lukemorales/query-key-factory';

import { DownloadFormat } from '@api/team-mood-tracker/apis.types';

import { TermsType } from '@common/components/modals/terms/TermsModal.types';

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
    recentBoxedFiles: (workspaceId: string) => [workspaceId, 'recentBoxedFiles'],
    calendar: (workspaceId: number, start: Date, end: Date) => [
      workspaceId,
      'calendar',
      start,
      end,
    ],
  },

  moodTracker: {
    all: null,
    detail: (moodTrackerHashedId: string) => [moodTrackerHashedId],
    report: (moodTrackerHashedId: string) => [moodTrackerHashedId, 'report'],
    downloadLink: (moodTrackerHashedId: string, format: DownloadFormat) => [
      moodTrackerHashedId,
      'download',
      format,
    ],
  },

  user: {
    // 매개변수가 없는 키는 null로 정의합니다.
    all: null,
    userInfo: null, // TODO: ??
    // 매개변수가 있는 키는 함수로 정의합니다.
    detail: () => ['user', 'detail'],
    edit: () => ['user', 'edit'],
  },

  terms: {
    all: null,
    detail: (type: TermsType) => [type],
  },
});

export default queryKeys;
