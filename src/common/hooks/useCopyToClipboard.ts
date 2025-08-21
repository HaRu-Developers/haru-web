'use client';

import { ToastType } from '@common/types/toast.types';

import { useToastActions } from '@common/hooks/stores/useToastStore';

/**
 * text를 받아 복사하는 비동기 함수를 반환하는 훅
 *
 * 토스트를 띄워야 해 훅으로 작성함
 */
export const useCopyToClipboard = () => {
  const { addToast } = useToastActions();

  /**
   * @params {string} title - 복사할 텍스트 이름 e.g.음성기록
   * @params {string} text - 복사할 텍스트
   */
  return async (title: string, text: string): Promise<boolean> => {
    try {
      // 브라우저/보안 컨텍스트 확인 (SSR 가드 포함)
      if (typeof navigator !== 'undefined' && navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        // fallback: textarea + execCommand
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.setAttribute('readonly', '');
        textarea.style.position = 'fixed';
        textarea.style.left = '-9999px';
        document.body.appendChild(textarea);
      }

      addToast({ text: `${title}이 복사되었어요`, type: ToastType.SUCCESS });
      return true;
    } catch (err) {
      console.error('텍스트 복사 실패:', err);
      addToast({ text: `${title}복사에 실패했어요`, type: ToastType.ERROR });
      return false;
    }
  };
};

export default useCopyToClipboard;
