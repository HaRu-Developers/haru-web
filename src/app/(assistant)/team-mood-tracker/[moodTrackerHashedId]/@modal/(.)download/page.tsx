'use client';

import { useRouter } from 'next/navigation';

import ModalLayout from '@common/components/layouts/ModalLayout/ModalLayout.client';
import DownloadModal from '@common/components/modals/DownloadModal/DownloadModal.client';

/**
 * @description 경로를 가로채서 보여주는 모달의 실제 컨텐츠
 */

const DownloadModalPage = () => {
  const router = useRouter();

  const handlePdfDownload = () => {
    console.log('PDF 다운로드 로직 실행');
    router.back();
  };

  const onWordDownload = () => {
    console.log('WORD 다운로드 로직 실행');
    router.back();
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
