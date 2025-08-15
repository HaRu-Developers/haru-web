'use client';

import { useEffect } from 'react';

import { useParams, useRouter } from 'next/navigation';

import useCreateSnsEventMutation from '@api/sns-event-assistant/post/mutations/useCreateSnsEventMutation';

import { useSnsEventAssistantInfo } from '@common/hooks/stores/useSnsEventAssistantStore';

import LoadingModal from '@common/components/modals/LoadingModal/LoadingModal.client';
import { LoadingModalType } from '@common/components/modals/LoadingModal/LoadingModal.types';

import ModalLayout from '@/common/components/layouts/ModalLayout/ModalLayout.client';

const CreatingEventModalClient = () => {
  const router = useRouter();
  const { workspaceId } = useParams<{ workspaceId: string }>();

  const { newTitle, newSnsEventLink, friendTag, winnerCount, keyword, period } =
    useSnsEventAssistantInfo();
  const { mutate } = useCreateSnsEventMutation();
  const condition = {
    winnerCount: winnerCount ?? 0,
    isPeriod: !!period,
    period: period ? period?.endDate : null,
    isKeyword: !!keyword,
    // keyword는 배열로 되어 있으나 벡엔드는 string으로 받음
    keyword: [...(keyword?.keyword ?? [])][0],
    isTaged: !!friendTag,
    tageCount: friendTag?.requiredFriendTag ?? 0,
  };
  useEffect(() => {
    mutate(
      { workspaceId, title: newTitle, snsEventLink: newSnsEventLink, condition },
      {
        onSuccess: (data) => {
          const snsEventId = data?.result?.snsEventId;
          router.push(`/workspace/${workspaceId}/sns-event-assistant/${snsEventId}`);
        },
        onError: (error) => {
          console.error('SNS 이벤트 어시스턴트 생성 실패:', error);
        },
      },
    );
  }, [mutate, workspaceId, newTitle, newSnsEventLink, condition, router]);

  const handleClose = () => {
    router.back();
  };

  return (
    <ModalLayout>
      <LoadingModal modalType={LoadingModalType.SNS_EVENT} onClose={handleClose} />
    </ModalLayout>
  );
};

export default CreatingEventModalClient;
