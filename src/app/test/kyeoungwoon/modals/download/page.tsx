'use client';

import DeleteModal from '@common/components/modals/DeleteModal/DeleteModal.client';
import { DeleteModalType } from '@common/components/modals/DeleteModal/DeleteModal.types';
import DownloadModal from '@common/components/modals/DownloadModal/DownloadModal.client';

const ModalTestPage = () => {
  const handleDevMode = () => console.log('Something Clicked');

  return (
    <div className="space-y-10pxr grid grid-rows-3">
      <p>Modal Page</p>
      <DownloadModal
        onClose={handleDevMode}
        onPdfDownload={handleDevMode}
        onWordDownload={handleDevMode}
      />
    </div>
  );
};

export default ModalTestPage;
