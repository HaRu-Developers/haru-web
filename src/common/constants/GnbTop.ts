export enum GnbTopSection {
  MAIN = 'MAIN',
  AI_MEETING_MANAGER = 'AI_MEETING_MANAGER',
  SNS_EVENT_ASSISTANT = 'SNS_EVENT_ASSISTANT',
  TEAM_MOOD_TRACKER = 'TEAM_MOOD_TRACKER',
  CALENDAR = 'CALENDAR',
  CUSTOM = 'CUSTOM',
}

export enum SectionOptionKey {
  SERVICE_HOME = 'SERVICE_HOME',
  ALL_MEETINGS = 'ALL_MEETINGS',
  ALL_EVENTS = 'ALL_EVENTS',
  SNS_LINK_MANAGE = 'SNS_LINK_MANAGE',
  ALL_REPORTS = 'ALL_REPORTS',
  CALENDAR = 'CALENDAR',
}

export enum SnsGnbTabType {
  ALL_EVENTS = 'ALL_EVENTS',
  SNS_LINK_MANAGE = 'SNS_LINK_MANAGE',
}

export const SnsGnbTabLabels: Record<SnsGnbTabType, string> = {
  [SnsGnbTabType.ALL_EVENTS]: '전체 이벤트',
  [SnsGnbTabType.SNS_LINK_MANAGE]: 'SNS 링크 관리',
};

export const sectionConfigs = {
  [GnbTopSection.MAIN]: {
    title: '메인 홈',
    options: [{ label: '서비스 홈', key: SectionOptionKey.SERVICE_HOME }],
  },
  [GnbTopSection.AI_MEETING_MANAGER]: {
    title: 'AI 회의 진행 매니저',
    options: [{ label: '전체 회의록', key: SectionOptionKey.ALL_MEETINGS }],
  },
  [GnbTopSection.SNS_EVENT_ASSISTANT]: {
    title: 'SNS 이벤트 어시스턴트',
    options: [], // 실제 탭은 컴포넌트에서 구성
  },
  [GnbTopSection.TEAM_MOOD_TRACKER]: {
    title: '팀 분위기 트래커',
    options: [{ label: '전체 리포트', key: SectionOptionKey.ALL_REPORTS }],
  },
  [GnbTopSection.CALENDAR]: {
    title: '내 캘린더',
    options: [{ label: '캘린더', key: SectionOptionKey.CALENDAR }],
  },
  [GnbTopSection.CUSTOM]: (title: string) => ({
    title,
    options: [],
  }),
} as const;
