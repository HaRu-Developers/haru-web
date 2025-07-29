'use client';

import { FileType } from '@common/types/file-type.enum';

import TextCta from '@common/components/cta/TextCta/TextCta.client';

import { TextCtaWrapperProps } from './TextCtaWrapper.types';

const TextCtaWrapper = ({ fileType }: TextCtaWrapperProps) => {
  const handleClick = (fileType: FileType) => {
    switch (fileType) {
      case FileType.AI_MEETING_MANAGER:
        console.log('새 회의 모달 열기');
        break;

      case FileType.SNS_EVENT_ASSISTANT:
        console.log('새 이벤트 생성 모달 열기');
        break;

      case FileType.TEAM_MOOD_TRACKER:
        console.log('새 설문 생성 모달 열기');
        break;

      default:
        console.warn('지원하지 않는 fileType입니다.');
    }
  };

  return <TextCta type={fileType} onClick={() => handleClick(fileType)} />;
};

export default TextCtaWrapper;
