'use client';

import { useState } from 'react';

import { useParams, useRouter } from 'next/navigation';

import useDeleteMeetingMinutes from '@api/meeting/delete/mutations/useDeleteMeetingMinutes';

import { logApiError } from '@common/errors/api-error.utils';

import { DeleteModalType } from '@common/components/modals/DeleteModal/DeleteModal.types';

import {
  useListActions,
  useListInfo,
} from '@features/ai-meeting-manager/hooks/stores/useListStore';

import ModalLayout from '@/common/components/layouts/ModalLayout/ModalLayout.client';
import DeleteModal from '@/common/components/modals/DeleteModal/DeleteModal.client';

const ConfirmDeleteMeetingMinutesModalPage = () => {
  const router = useRouter();
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const [submitting, setSubmitting] = useState(false);

  const { checkedIds } = useListInfo();
  const { clearChecked, toggleCheckMode } = useListActions();

  // api 호출 완료 후 페이지 이동할 거여서 mutateAsync 사용
  const {
    mutateAsync: deleteOne,
    isError,
    error,
    isPending,
  } = useDeleteMeetingMinutes(workspaceId);

  if (isError) throw error;

  const handleClose = () => router.back();

  const handleProceed = async () => {
    try {
      setSubmitting(true);
      const ids = Array.from(checkedIds);
      // 단일 삭제만 지원하니까 병렬 호출
      await Promise.all(ids.map((id) => deleteOne({ meetingId: id })));
      // 선택 초기화, 선택모드 종료
      clearChecked();
      toggleCheckMode();
      // 모달 닫기
      router.back();
    } catch (e) {
      logApiError(e);
    } finally {
      setSubmitting(false);
    }
  };

  const disabled = isPending || submitting;

  return (
    <ModalLayout>
      <DeleteModal
        modalType={DeleteModalType.DELETE_MEETING_MINUTES}
        onClose={handleClose}
        onAbort={handleClose}
        onProceed={handleProceed}
        cancelBtnDisabled={disabled}
        deleteBtnDisabled={disabled}
        loading={disabled}
        loadingText="삭제 중..."
      />
    </ModalLayout>
  );
};

export default ConfirmDeleteMeetingMinutesModalPage;
