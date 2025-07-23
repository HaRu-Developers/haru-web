// 공통 GNB 섹션 구분
export enum GnbSection {
  MAIN = 'MAIN',
  AI_MEETING_MANAGER = 'AI_MEETING_MANAGER',
  SNS_EVENT_ASSISTANT = 'SNS_EVENT_ASSISTANT',
  TEAM_MOOD_TRACKER = 'TEAM_MOOD_TRACKER',
  CALENDAR = 'CALENDAR',
  CUSTOM = 'CUSTOM',
}

// ─────────────────────────────────────────────

// GNB Left
// LeftNav에 실제로 사용하는 값만 따로 필터링
export type GnbLeftSection = Exclude<GnbSection, GnbSection.CUSTOM>;

// ─────────────────────────────────────────────

// GNB Top
// 옵션 키
export enum SectionOptionKey {
  SERVICE_HOME = 'SERVICE_HOME',
  ALL_MEETINGS = 'ALL_MEETINGS',
  ALL_EVENTS = 'ALL_EVENTS',
  SNS_LINK_MANAGE = 'SNS_LINK_MANAGE',
  ALL_REPORTS = 'ALL_REPORTS',
  CALENDAR = 'CALENDAR',
}

// SNS 전용 탭 타입
export enum SnsGnbTabType {
  ALL_EVENTS = 'ALL_EVENTS',
  SNS_LINK_MANAGE = 'SNS_LINK_MANAGE',
}

// 섹션 구성 설정
// 객체 형태
export type StaticSectionConfig = {
  title: string;
  options: { label: string; key: SectionOptionKey }[];
};

// 함수 형태 (CUSTOM용)
export type CustomSectionConfigFn = (title: string) => StaticSectionConfig;

export type SectionConfigs = {
  [K in Exclude<GnbSection, GnbSection.CUSTOM>]: StaticSectionConfig;
} & {
  [GnbSection.CUSTOM]: CustomSectionConfigFn;
};
