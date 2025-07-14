import { LeftGnbIconsState } from '@icons/LeftGnbIcons/LeftGnbIcons.types';

import { Routes } from './routes';

// 공통 gnb 섹션 타입
export enum GnbSection {
  MAIN = 'MAIN',
  AI_MEETING_MANAGER = 'AI_MEETING_MANAGER',
  SNS_EVENT_ASSISTANT = 'SNS_EVENT_ASSISTANT',
  TEAM_MOOD_TRACKER = 'TEAM_MOOD_TRACKER',
  CALENDAR = 'CALENDAR',
  CUSTOM = 'CUSTOM',
}

// 공통 gnb 섹션 라벨
export const GnbSectionLabels: Record<GnbSection, string> = {
  [GnbSection.MAIN]: '메인 홈',
  [GnbSection.AI_MEETING_MANAGER]: 'AI 회의 진행 매니저',
  [GnbSection.SNS_EVENT_ASSISTANT]: 'SNS 이벤트 어시스턴트',
  [GnbSection.TEAM_MOOD_TRACKER]: '팀 분위기 트래커',
  [GnbSection.CALENDAR]: '내 캘린더',
  [GnbSection.CUSTOM]: '사용자 정의',
};

// ─────────────────────────────────────────────

// GnbLeft
// LeftNav에 실제로 사용하는 값만 따로 필터링
export type GnbLeftSection = Exclude<GnbSection, GnbSection.CUSTOM>;

// nav 항목 리스트
export const GnbLeftNavItems: GnbLeftSection[] = [
  GnbSection.MAIN,
  GnbSection.AI_MEETING_MANAGER,
  GnbSection.SNS_EVENT_ASSISTANT,
  GnbSection.TEAM_MOOD_TRACKER,
  GnbSection.CALENDAR,
];

// 각 섹션에 대응하는 라우팅 경로
export const GnbSectionPaths: Record<GnbLeftSection, string> = {
  [GnbSection.MAIN]: Routes.MAIN,
  [GnbSection.AI_MEETING_MANAGER]: Routes.AI_MEETING_MANAGER,
  [GnbSection.SNS_EVENT_ASSISTANT]: Routes.SNS_EVENT_ASSISTANT,
  [GnbSection.TEAM_MOOD_TRACKER]: Routes.TEAM_MOOD_TRACKER,
  [GnbSection.CALENDAR]: Routes.CALENDAR,
};

// 아이콘 매핑용 state
export const GnbLeftNavItemIconState: Record<GnbLeftSection, LeftGnbIconsState> = {
  [GnbSection.MAIN]: LeftGnbIconsState.HOME,
  [GnbSection.AI_MEETING_MANAGER]: LeftGnbIconsState.AI_MANAGER,
  [GnbSection.SNS_EVENT_ASSISTANT]: LeftGnbIconsState.SNS_ASSISTANT,
  [GnbSection.TEAM_MOOD_TRACKER]: LeftGnbIconsState.TEAM_MOOD_TRACKER,
  [GnbSection.CALENDAR]: LeftGnbIconsState.MY_CALENDAR,
};

// ─────────────────────────────────────────────

// GnbTop
// 옵션 키
export enum SectionOptionKey {
  SERVICE_HOME = 'SERVICE_HOME',
  ALL_MEETINGS = 'ALL_MEETINGS',
  ALL_EVENTS = 'ALL_EVENTS',
  SNS_LINK_MANAGE = 'SNS_LINK_MANAGE',
  ALL_REPORTS = 'ALL_REPORTS',
  CALENDAR = 'CALENDAR',
}

// 옵션 키 라벨 매핑
export const SectionOptionLabels: Record<SectionOptionKey, string> = {
  [SectionOptionKey.SERVICE_HOME]: '서비스 홈',
  [SectionOptionKey.ALL_MEETINGS]: '전체 회의록',
  [SectionOptionKey.ALL_EVENTS]: '전체 이벤트',
  [SectionOptionKey.SNS_LINK_MANAGE]: 'SNS 링크 관리',
  [SectionOptionKey.ALL_REPORTS]: '전체 리포트',
  [SectionOptionKey.CALENDAR]: '캘린더',
};

// SNS 전용 탭 타입 및 라벨
export enum SnsGnbTabType {
  ALL_EVENTS = 'ALL_EVENTS',
  SNS_LINK_MANAGE = 'SNS_LINK_MANAGE',
}

export const SnsGnbTabLabels: Record<SnsGnbTabType, string> = {
  [SnsGnbTabType.ALL_EVENTS]: '전체 이벤트',
  [SnsGnbTabType.SNS_LINK_MANAGE]: 'SNS 링크 관리',
};

// 섹션 구성 설정
export const sectionConfigs = {
  [GnbSection.MAIN]: {
    title: GnbSectionLabels[GnbSection.MAIN],
    options: [
      {
        label: SectionOptionLabels[SectionOptionKey.SERVICE_HOME],
        key: SectionOptionKey.SERVICE_HOME,
      },
    ],
  },
  [GnbSection.AI_MEETING_MANAGER]: {
    title: GnbSectionLabels[GnbSection.AI_MEETING_MANAGER],
    options: [
      {
        label: SectionOptionLabels[SectionOptionKey.ALL_MEETINGS],
        key: SectionOptionKey.ALL_MEETINGS,
      },
    ],
  },
  [GnbSection.SNS_EVENT_ASSISTANT]: {
    title: GnbSectionLabels[GnbSection.SNS_EVENT_ASSISTANT],
    options: [], // 탭으로 구성 (별도 관리)
  },
  [GnbSection.TEAM_MOOD_TRACKER]: {
    title: GnbSectionLabels[GnbSection.TEAM_MOOD_TRACKER],
    options: [
      {
        label: SectionOptionLabels[SectionOptionKey.ALL_REPORTS],
        key: SectionOptionKey.ALL_REPORTS,
      },
    ],
  },
  [GnbSection.CALENDAR]: {
    title: GnbSectionLabels[GnbSection.CALENDAR],
    options: [
      {
        label: SectionOptionLabels[SectionOptionKey.CALENDAR],
        key: SectionOptionKey.CALENDAR,
      },
    ],
  },
  [GnbSection.CUSTOM]: (title: string) => ({
    title,
    options: [],
  }),
} as const;
