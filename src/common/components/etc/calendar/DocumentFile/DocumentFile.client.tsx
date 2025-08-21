'use client';

import { useParams, useRouter } from 'next/navigation';

import FeaturedFileIcons from '@icons/FeaturedFileIcons/FeaturedFileIcons';
import { FeaturedFileIconsState } from '@icons/FeaturedFileIcons/FeaturedFileIcons.types';

import { FileType } from '@common/types/file-type.enum';

import { ROUTES } from '@common/constants/routes.constants';

import { DocumentFileProps } from './DocumentFile.types';

/*
 * 문서 파일 컴포넌트
 * 각 문서 파일을 보여주는 컴포넌트
 * 클릭 시 onClick 이벤트를 발생시킴
 */
const DocumentFile = ({ file }: DocumentFileProps) => {
  const documentIconMap = {
    [FileType.AI_MEETING_MANAGER]: FeaturedFileIconsState.SIZE_16_AI_MANAGER_FILE,
    [FileType.SNS_EVENT_ASSISTANT]: FeaturedFileIconsState.SIZE_16_SNS_ASSISTANT_FILE,
    [FileType.TEAM_MOOD_TRACKER]: FeaturedFileIconsState.SIZE_16_TEAM_MOOD_FILE,
  };
  const router = useRouter();
  const iconState = documentIconMap[file.documentType];
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const handleClick = () => {
    switch (file.documentType) {
      case FileType.AI_MEETING_MANAGER:
        router.push(ROUTES.AI_MEETING_MANAGER.MEETING(workspaceId, file.documentId));
        break;
      case FileType.SNS_EVENT_ASSISTANT:
        router.push(ROUTES.SNS_EVENT_ASSISTANT.DETAIL(workspaceId, file.documentId));
        break;
      case FileType.TEAM_MOOD_TRACKER:
        // TODO: TEAM_MOOD_TRACKER 라우트 구현 후 활성화 - router.push(ROUTES.TEAM_MOOD_TRACKER.MAIN(workspaceId, file?.documentId));
        break;
    }
  };
  return (
    <div
      className="border-stroke-200 h-30pxr w-136pxr rounded-6pxr shadow-calendar mx-1.5 flex shrink-0 cursor-pointer items-center gap-0.5 border bg-white p-1.5 hover:bg-gray-600"
      onClick={handleClick}
    >
      {iconState && <FeaturedFileIcons state={iconState} />}
      <span className="text-bt3-sb w-105pxr pointer-events-none overflow-hidden text-ellipsis whitespace-nowrap select-none">
        {file.title}
      </span>
    </div>
  );
};

export default DocumentFile;
