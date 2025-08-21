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
  meetings: {
    all: null,
    create: ['meetingMinutes', 'create'],
    detail: (meetingId: string) => ['meetingMinutes', 'detail', meetingId],
    list: (workspaceId: string) => ['meetingMinutes', 'list', workspaceId],
    delete: (workspaceId: string) => ['meetings', 'delete', workspaceId],
    downloadLink: (meetingId: string, format: DownloadFormat) => [
      'meetingMinutes',
      'downloadLink',
      meetingId,
      format,
    ],
    voiceLink: (meetingId: string) => ['meetingMinutes', 'voiceLink', meetingId],
    speechQuestion: (meetingId: string) => ['meetingMinutes', 'speechQuestion', meetingId],
    end: (meetingId: string) => ['meetingMinutes', 'end', meetingId],
    editTitle: (meetingId: string) => ['meetingMinutes', 'editTitle', meetingId],
    editProceeding: (meetingId: string) => ['meetingMinutes', 'editProceeding', meetingId],
  },

  snsEventAssistant: {
    all: null,
    detail: (snsEventId: string) => [snsEventId],
    list: (workspaceId: string) => [workspaceId, 'list'],
    download: (snsEventId: string) => [snsEventId, 'list', 'download'],
  },

  moodTracker: {
    all: null,
    question: (moodTrackerHashedId: string) => ['moodTracker', moodTrackerHashedId, 'question'],
    detail: (moodTrackerHashedId: string) => [moodTrackerHashedId],
    report: (moodTrackerHashedId: string) => [moodTrackerHashedId, 'report'],
    reportList: (workspaceId: string) => [workspaceId, 'reportList'],
    downloadLink: (moodTrackerHashedId: string, format: DownloadFormat) => [
      moodTrackerHashedId,
      'download',
      format,
    ],
    surveyBasicInfo: (moodTrackerHashedId: string) => [moodTrackerHashedId, 'surveyBasicInfo'],
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
