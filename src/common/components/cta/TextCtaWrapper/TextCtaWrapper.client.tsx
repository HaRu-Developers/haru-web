'use client';

import { usePathname, useRouter } from 'next/navigation';

import { FileType } from '@common/types/file-type.enum';

import { ROUTES } from '@common/constants/routes.constants';

import TextCta from '@common/components/cta/TextCta/TextCta.client';

import { TextCtaWrapperProps } from './TextCtaWrapper.types';

const TextCtaWrapper = ({ fileType, workspaceId }: TextCtaWrapperProps) => {
  const router = useRouter();
  const pathname = usePathname();

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
        // TODO : optional 제거와 함께 제거
        if (!workspaceId) {
          console.warn('workspaceId가 제공되지 않았습니다.');
          return;
        }
        router.push(ROUTES.MODAL.TEAM_MOOD_TRACKER.CREATE_SURVEY(workspaceId));
        break;

      default:
        console.warn('지원하지 않는 fileType입니다.');
    }
  };

  return <TextCta type={fileType} onClick={() => handleClick(fileType)} />;
};

export default TextCtaWrapper;
