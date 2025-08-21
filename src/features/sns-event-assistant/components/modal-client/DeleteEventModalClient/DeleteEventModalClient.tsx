'use client';

import { useParams, useRouter } from 'next/navigation';

import useDeleteSnsEventMutation from '@api/sns-event-assistant/delete/mutations/useDeleteSnsEventMutation';

import {
  useSnsEventAssistantActions,
  useSnsEventAssistantInfo,
} from '@common/hooks/stores/useSnsEventAssistantStore';

import DeleteModal from '@common/components/modals/DeleteModal/DeleteModal.client';
import { DeleteModalType } from '@common/components/modals/DeleteModal/DeleteModal.types';

import ModalLayout from '@/common/components/layouts/ModalLayout/ModalLayout.client';

const DeleteEventModalClient = () => {
  const router = useRouter();
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const { checkedList } = useSnsEventAssistantInfo();
  const { setCheckedList, setIsCheckedMode } = useSnsEventAssistantActions();
  const { mutate, isPending } = useDeleteSnsEventMutation(workspaceId);

  const handleClose = () => {
    router.back();
  };

  const handleDelete = () => {
    if (checkedList.length === 0) return;
    setCheckedList([]);
    setIsCheckedMode(false);
    checkedList.forEach((snsEventId) => {
      mutate(
        { snsEventId },
        {
          onSuccess: () => {
            router.back();
          },
          onError: (error) => {
            console.error(`Deletion of ${snsEventId} failed:`, error);
            setCheckedList([...checkedList, snsEventId]);
            setIsCheckedMode(true);
          },
        },
      );
    });
  };

  return (
    <ModalLayout>
      <DeleteModal
        modalType={DeleteModalType.DELETE_EVENT}
        onClose={handleClose}
        onAbort={handleClose}
        onProceed={handleDelete}
        cancelBtnDisabled={isPending}
        deleteBtnDisabled={isPending}
        loading={isPending}
        loadingText="삭제 중..."
      />
    </ModalLayout>
  );
};

export default DeleteEventModalClient;
