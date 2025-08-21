'use client';

import { useCallback } from 'react';

import { useParams, useRouter } from 'next/navigation';

import useFetchMeetingMinutesDownloadLink from '@api/meeting/get/queries/useFetchMeetingMinutesDownloadLink';

import { DownloadFormat } from '@common/types/download.enum.types';
import { ToastType } from '@common/types/toast.types';

import { API_ERROR_CODES } from '@common/constants/api-error-codes.constants';

import { ApiError } from '@common/errors/ApiError';

import { useToastActions } from '@common/hooks/stores/useToastStore';
import useDownloadDocument from '@common/hooks/useDownloadDocument';

import ModalLayout from '@common/components/layouts/ModalLayout/ModalLayout.client';
import DownloadModal from '@common/components/modals/DownloadModal/DownloadModal.client';

const DownloadMeetingMinutesModalPage = () => {
  const router = useRouter();
  const { meetingId } = useParams<{ meetingId: string }>();
  const { addToast } = useToastActions();

  // 링크 받는 함수
  const { getLink } = useFetchMeetingMinutesDownloadLink(meetingId);

  // 2) 다운로드 훅 (상태/실행)
  const { startDownload } = useDownloadDocument({
    getLink,
    onDone: () => {
      // 새창 열었으면 모달 닫기
      router.back();
    },
    onError: (err) => {
      const apiError = err as ApiError;
      if (apiError?.code === API_ERROR_CODES.MEETING.MINUTES_NOT_FOUND) {
        addToast({
          text: apiError?.body?.message ?? '회의록이 존재하지 않습니다',
          type: ToastType.ERROR,
        });
        // 다운로드 모달 닫기
        router.back();
      } else {
        addToast({ text: '회의록 다운로드에 실패했습니다.', type: ToastType.ERROR });
        // 다운로드 모달 닫기
        router.back();
      }
    },
  });

  const handlePdfDownload = useCallback(() => {
    startDownload(DownloadFormat.PDF);
  }, [startDownload]);

  const handleWordDownload = useCallback(() => {
    startDownload(DownloadFormat.DOCX);
  }, [startDownload]);

  return (
    <ModalLayout canClickDimmed={false}>
      <DownloadModal
        onClose={() => router.back()}
        onPdfDownload={handlePdfDownload}
        onWordDownload={handleWordDownload}
      />
    </ModalLayout>
  );
};

export default DownloadMeetingMinutesModalPage;
