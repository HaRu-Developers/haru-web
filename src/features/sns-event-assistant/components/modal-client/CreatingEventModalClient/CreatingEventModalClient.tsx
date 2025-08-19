'use client';

import { useEffect, useRef } from 'react';

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

  const { mutate, isPending } = useCreateSnsEventMutation(workspaceId);

  const hasCalledMutate = useRef(false);

  useEffect(() => {
    if (!hasCalledMutate.current) {
      hasCalledMutate.current = true;

      const condition = {
        winnerCount: winnerCount ?? 0,
        isPeriod: period?.isActive ?? false,
        period: period?.endDate,
        isKeyword: keyword?.isActive ?? false,
        keyword: [...(keyword?.keyword ?? [])][0], // keyword는 배열로 되어 있으나 백엔드는 string으로 받음
        isTaged: friendTag?.isActive ?? false,
        tageCount: friendTag?.requiredFriendTag ?? 0,
      };
      mutate(
        { workspaceId, title: newTitle, snsEventLink: newSnsEventLink, snsCondition: condition },
        {
          onError: (error) => {
            console.error('SNS 이벤트 어시스턴트 생성 실패:', error);
            router.back();
          },
        },
      );
    }
  }, [
    mutate,
    workspaceId,
    newTitle,
    newSnsEventLink,
    friendTag,
    winnerCount,
    keyword,
    period,
    router,
  ]);

  const handleClose = () => {
    router.back();
  };

  if (isPending) {
    return (
      <ModalLayout>
        <LoadingModal modalType={LoadingModalType.SNS_EVENT} onClose={handleClose} />
      </ModalLayout>
    );
  }
  return null;
};

export default CreatingEventModalClient;
