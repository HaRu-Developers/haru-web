'use client';

import { useParams, useRouter } from 'next/navigation';

import { FileType } from '@common/types/file-type.enum';

import { ROUTES } from '@common/constants/routes.constants';

import { useSnsEventAssistantInfo } from '@common/hooks/stores/useSnsEventAssistantStore';

import ListDeleteButton from '@common/components/list-file/ListDeleteButton/ListDeleteButton.client';
import ListHeader from '@common/components/list-file/ListHeader/ListHeader.server';

import ListFileSnsEventAssistantWrapper from '../ListFileSnsEventAssistantWrapper/ListFileSnsEventAssistantWrapper.client';

/**
 * SNS 이벤트 어시스턴트 파일 목록 전체 부분을 표시하는 컴포넌트입니다.
 * Check 모드 시 삭제 버튼을 표시합니다.
 */
const ListFileSnsEventAssistantListWrapper = () => {
  const { isCheckedMode } = useSnsEventAssistantInfo();
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const router = useRouter();
  const handleDelete = () => {
    router.push(ROUTES.SNS_EVENT_ASSISTANT.DELETE(workspaceId));
  };
  return (
    <>
      {!isCheckedMode ? (
        <div className="mt-20pxr">
          <ListHeader fileType={FileType.SNS_EVENT_ASSISTANT} />
        </div>
      ) : (
        <div className="pb-10pxr mt-7pxr mb-9pxr border-b-stroke-200 w-full border-b">
          <ListDeleteButton onClick={handleDelete} />
        </div>
      )}
      <ListFileSnsEventAssistantWrapper />
    </>
  );
};

export default ListFileSnsEventAssistantListWrapper;
