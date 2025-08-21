'use client';

import { useState } from 'react';

// ✅ 1. useParams 훅을 import하여 URL에서 ID를 가져옵니다.
import { useParams, useRouter } from 'next/navigation';

import { DownloadFormat } from '@api/team-mood-tracker/apis.types';
import { useDownloadReportQuery } from '@api/team-mood-tracker/get/queries/useDownloadReport';

import { ToastType } from '@common/types/toast.types';

import { useToastActions } from '@common/hooks/stores/useToastStore';

// ✅ 2. 다운로드 훅과 관련 타입을 import 합니다.
import ModalLayout from '@common/components/layouts/ModalLayout/ModalLayout.client';
import DownloadModal from '@common/components/modals/DownloadModal/DownloadModal.client';

const DownloadModalPage = () => {
  const { addToast } = useToastActions();
  const router = useRouter();
  // ✅ 3. URL에서 moodTrackerHashedId를 가져옵니다.
  const { moodTrackerHashedId } = useParams<{ moodTrackerHashedId?: string }>();

  // ✅ 4. API 요청을 제어할 상태를 만듭니다.
  const [enabled, setEnabled] = useState(false);
  const [format, setFormat] = useState<DownloadFormat>(DownloadFormat.PDF);

  // ✅ 5. 다운로드 링크 조회 훅을 호출합니다.
  useDownloadReportQuery(
    {
      moodTrackerHashedId: moodTrackerHashedId ?? '',
      format,
    },
    {
      enabled, // enabled 상태가 true일 때만 API 요청
      onSuccess: (data) => {
        // 성공 시: 받아온 링크를 새 탭에서 열어 다운로드 실행
        window.open(data.downloadLink, '_blank');
        setEnabled(false); // 쿼리 재실행 방지를 위해 비활성화
        router.back(); // 모달 닫기
      },
      onError: (error) => {
        // 실패 시: 에러 알림
        addToast({
          text: `다운로드에 실패했습니다: ${error.message}`,
          type: ToastType.ERROR,
        });
        setEnabled(false); // 쿼리 재실행 방지를 위해 비활성화
      },
    },
  );

  const handlePdfDownload = () => {
    setFormat(DownloadFormat.PDF); // 포맷을 PDF로 설정
    setEnabled(true); // 쿼리 실행!
  };

  const onWordDownload = () => {
    setFormat(DownloadFormat.DOCX); // 포맷을 DOCX로 설정
    setEnabled(true); // 쿼리 실행!
  };

  return (
    <ModalLayout>
      <DownloadModal
        onClose={() => router.back()}
        onPdfDownload={handlePdfDownload}
        onWordDownload={onWordDownload}
      />
    </ModalLayout>
  );
};

export default DownloadModalPage;
