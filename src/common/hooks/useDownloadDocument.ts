import { useCallback } from 'react';

import { DownloadFormat } from '@common/types/download.enum.types';

type UseDownloadDocumentParams = {
  getLink: (format: DownloadFormat) => Promise<string>; // 링크받는 함수
  onDone?: () => void; // 새창 연 후 처리
  onError?: (err: unknown) => void;
};

/**
 * 링크를 받는 함수를 받아 새탭을 열어 다운 처리를 하는 함수
 */
const useDownloadDocument = ({ getLink, onDone, onError }: UseDownloadDocumentParams) => {
  const startDownload = useCallback(
    async (format: DownloadFormat) => {
      try {
        const link = await getLink(format);
        // 새 탭 열기
        // noopener로 새 창/탭으로 연 링크가 열린 쪽(window.opener)에 접근하지 못하게 함
        window.open(link, '_blank', 'noopener');
        onDone?.();
      } catch (e) {
        onError?.(e);
      }
    },
    [getLink, onDone, onError],
  );

  return { startDownload };
};

export default useDownloadDocument;
