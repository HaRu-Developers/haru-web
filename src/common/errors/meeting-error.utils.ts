import { notFound } from 'next/navigation';

import { ToastType } from '@common/types/toast.types';

import { API_ERROR_CODES } from '@common/constants/api-error-codes.constants';

import { ApiError } from './ApiError';

export const handleMeetingError = (
  error: unknown,
  opts?: { addToast?: (p: { text: string; type: ToastType; duration?: number }) => void },
) => {
  const code = (error as ApiError)?.code as string | undefined;

  switch (code) {
    case API_ERROR_CODES.USER_WORKSPACE.NOT_FOUND:
    case API_ERROR_CODES.MEETING.NOT_FOUND:
      // 404 페이지로
      notFound();
      return;

    case API_ERROR_CODES.MEETING.FILE_NOT_FOUND:
      // 파일(안건지) 업로드 유도
      opts?.addToast?.({
        text: '안건지가 업로드되지 않았습니다. 파일을 먼저 업로드해 주세요.',
        type: ToastType.ERROR,
      });
      return;

    default:
      opts?.addToast?.({
        text: '알 수 없는 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.',
        type: ToastType.ERROR,
      });
  }
};
