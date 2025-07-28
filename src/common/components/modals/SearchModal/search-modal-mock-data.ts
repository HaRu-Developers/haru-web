import { FileType } from '@common/types/file-type.enum';

import { SearchResult } from './SearchModal.types';

// Mock data
export const mockSearchResults: SearchResult[] = [
  {
    fileType: FileType.AI_MEETING_MANAGER,
    title: '2024년 마케팅 전략 기획서',
    lastOpened: new Date('2024-07-20T14:30:00'),
  },
  {
    fileType: FileType.SNS_EVENT_ASSISTANT,
    title: '고객 데이터 분석 리포트',
    lastOpened: new Date('2024-07-18T09:15:00'),
  },
  {
    fileType: FileType.TEAM_MOOD_TRACKER,
    title: '신제품 런칭 발표자료',
    lastOpened: new Date('2024-07-15T16:45:00'),
  },
  {
    fileType: FileType.AI_MEETING_MANAGER,
    title: '프로젝트 요구사항 명세서',
    lastOpened: new Date('2024-07-12T11:20:00'),
  },
  {
    fileType: FileType.TEAM_MOOD_TRACKER,
    title: '사용자 매뉴얼 v2.0',
    lastOpened: new Date('2024-07-10T13:00:00'),
  },
  {
    fileType: FileType.SNS_EVENT_ASSISTANT,
    title: '브랜드 로고 디자인',
    lastOpened: new Date('2024-07-08T10:30:00'),
  },
  {
    fileType: FileType.SNS_EVENT_ASSISTANT,
    title: '월별 매출 현황',
    lastOpened: new Date('2024-07-05T15:20:00'),
  },
  {
    fileType: FileType.TEAM_MOOD_TRACKER,
    title: '팀 미팅 진행사항',
    lastOpened: new Date('2024-07-03T14:10:00'),
  },
  {
    fileType: FileType.AI_MEETING_MANAGER,
    title: '2024년 마케팅 전략 기획서',
    lastOpened: new Date('2024-07-20T14:30:00'),
  },
  {
    fileType: FileType.SNS_EVENT_ASSISTANT,
    title: '고객 데이터 분석 리포트',
    lastOpened: new Date('2024-07-18T09:15:00'),
  },
  {
    fileType: FileType.TEAM_MOOD_TRACKER,
    title: '신제품 런칭 발표자료',
    lastOpened: new Date('2024-07-15T16:45:00'),
  },
  {
    fileType: FileType.AI_MEETING_MANAGER,
    title: '프로젝트 요구사항 명세서',
    lastOpened: new Date('2024-07-12T11:20:00'),
  },
  {
    fileType: FileType.TEAM_MOOD_TRACKER,
    title: '사용자 매뉴얼 v2.0',
    lastOpened: new Date('2024-07-10T13:00:00'),
  },
  {
    fileType: FileType.SNS_EVENT_ASSISTANT,
    title: '브랜드 로고 디자인',
    lastOpened: new Date('2024-07-08T10:30:00'),
  },
  {
    fileType: FileType.SNS_EVENT_ASSISTANT,
    title: '월별 매출 현황',
    lastOpened: new Date('2024-07-05T15:20:00'),
  },
  {
    fileType: FileType.TEAM_MOOD_TRACKER,
    title: '팀 미팅 진행사항',
    lastOpened: new Date('2024-07-03T14:10:00'),
  },
];
export const mockRecentQueries: string[] = ['마케팅', '프로젝트', '매출', '디자인', '발표자료'];
