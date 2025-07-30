/**
 * assistant 구조에 사용되는 매핑 함수 모음
 */
import { ExtendedFileType, FileType, SNS_EVENT_ASSISTANT_LINK } from '@common/types/file-type.enum';
import { GnbSection } from '@common/types/gnbs.types';

import BoldText from '@common/components/BoldText/BoldText.server';
import GnbTop from '@common/components/gnbs/GnbTop/GnbTop.client';

/**
 * cta 박스 위 설명 컴포넌트 매핑
 */
export const getCtaDescription = (type: FileType) => {
  switch (type) {
    case FileType.AI_MEETING_MANAGER:
      return <BoldText text={'새 회의 시작하기'} className={'mt-28pxr mb-16pxr'} />;
    case FileType.SNS_EVENT_ASSISTANT:
      return <BoldText text={'새로운 이벤트 추첨 시작하기'} className={'mt-36pxr mb-16pxr'} />;
    case FileType.TEAM_MOOD_TRACKER:
      return <BoldText text={'새로운 팀 분위기 설문 시작하기'} className={'mt-36pxr mb-16pxr'} />;
    default:
      return null;
  }
};

/**
 * 리스트 위 제목 컴포넌트 매핑
 */
export const getListTitle = (type: ExtendedFileType) => {
  switch (type) {
    case FileType.AI_MEETING_MANAGER:
      return <BoldText text={'내 AI 회의록'} className={'mt-56pxr mb-16pxr'} />;
    case FileType.SNS_EVENT_ASSISTANT:
      return <BoldText text={'내 이벤트 추첨 기록'} className={'mt-56pxr mb-16pxr'} />;
    case FileType.TEAM_MOOD_TRACKER:
      return <BoldText text={'내 팀 분위기 리포트'} className={'mt-56pxr mb-16pxr'} />;
    case SNS_EVENT_ASSISTANT_LINK:
      return <BoldText text={'SNS 링크 관리'} className={'mt-36pxr mb-16pxr'} />;
    default:
      return null;
  }
};
