'use client';

import { useParams, useRouter } from 'next/navigation';

import { FileType } from '@common/types/file-type.enum';

import TextCta from '@common/components/cta/TextCta/TextCta.client';

import { TextCtaWrapperProps } from './TextCtaWrapper.types';

const TextCtaWrapper = ({ fileType }: TextCtaWrapperProps) => {
  const router = useRouter();
  const { workspaceId } = useParams();
  const handleClick = (fileType: FileType) => {
    if (!workspaceId) {
      console.warn('workspaceId를 찾을 수 없습니다.');
      return;
    }
    switch (fileType) {
      case FileType.AI_MEETING_MANAGER:
        console.log('새 회의 모달 열기');
        break;

      case FileType.SNS_EVENT_ASSISTANT:
        router.push(`/workspace/${workspaceId}/sns-event-assistant/new-event`);
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
