import { LeftGnbIconsState } from '@icons/LeftGnbIcons/LeftGnbIcons.types';

import {
  GnbLeftSection,
  GnbSection,
  SectionConfigs,
  SectionOptionKey,
  SnsGnbTabType,
} from '@common/types/gnbs.types';

import { ROUTES } from './routes.constants';

// 공통 GNB 섹션 라벨
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
// nav 항목 리스트
export const GnbLeftNavItems: GnbLeftSection[] = [
  GnbSection.MAIN,
  GnbSection.AI_MEETING_MANAGER,
  GnbSection.SNS_EVENT_ASSISTANT,
  GnbSection.TEAM_MOOD_TRACKER,
  GnbSection.CALENDAR,
];

// 각 섹션에 대응하는 라우팅 경로
export const GnbSectionPaths = (workspaceId: number) => ({
  [GnbSection.MAIN]: ROUTES.MAIN(workspaceId),
  [GnbSection.AI_MEETING_MANAGER]: ROUTES.AI_MEETING_MANAGER(workspaceId),
  [GnbSection.SNS_EVENT_ASSISTANT]: ROUTES.SNS_EVENT_ASSISTANT(workspaceId),
  [GnbSection.TEAM_MOOD_TRACKER]: ROUTES.TEAM_MOOD_TRACKER(workspaceId),
  [GnbSection.CALENDAR]: ROUTES.CALENDAR(workspaceId),
});

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
// 옵션 키 라벨 매핑
export const SectionOptionLabels: Record<SectionOptionKey, string> = {
  [SectionOptionKey.SERVICE_HOME]: '서비스 홈',
  [SectionOptionKey.ALL_MEETINGS]: '전체 회의록',
  [SectionOptionKey.ALL_EVENTS]: '전체 이벤트',
  [SectionOptionKey.SNS_LINK_MANAGE]: 'SNS 링크 관리',
  [SectionOptionKey.ALL_REPORTS]: '전체 리포트',
  [SectionOptionKey.CALENDAR]: '캘린더',
};

export const SnsGnbTabLabels: Record<SnsGnbTabType, string> = {
  [SnsGnbTabType.ALL_EVENTS]: '전체 이벤트',
  [SnsGnbTabType.SNS_LINK_MANAGE]: 'SNS 링크 관리',
};

export const sectionConfigs: SectionConfigs = {
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
