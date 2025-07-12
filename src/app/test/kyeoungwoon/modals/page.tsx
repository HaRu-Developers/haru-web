'use client';

import DeleteModal from '@common/components/modals/DeleteModal/DeleteModal.client';
import { DeleteModalType } from '@common/components/modals/DeleteModal/DeleteModal.types';
import DownloadModal from '@common/components/modals/DownloadModal/DownloadModal.client';
import LoadingModal from '@common/components/modals/LoadingModal/LoadingModal.client';
import { LoadingModalType } from '@common/components/modals/LoadingModal/LoadingModal.types';

const TestModalsPage = () => {
  const handleDevMode = () => console.log('Something Clicked');
  return (
    <div className="space-y-30pxr my-50pxr flex flex-col items-center justify-center">
      {/* <div>
        <span>Loading Modal</span>
        <LoadingModal onClose={handleDevMode} />
      </div> */}

      <span className="col-span-3 mb-2 text-center">Download Modal</span>
      <div>
        <DownloadModal
          onClose={handleDevMode}
          onPdfDownload={handleDevMode}
          onWordDownload={handleDevMode}
        />
      </div>

      <span className="col-span-3 mb-2 text-center">Delete Modal</span>
      <div className="grid grid-cols-3 grid-rows-2 gap-4">
        <DeleteModal
          modalType={DeleteModalType.DELETE_REPORT}
          onClose={handleDevMode}
          onAbort={handleDevMode}
          onProceed={handleDevMode}
        />
        <DeleteModal
          modalType={DeleteModalType.DELETE_MEETING_MINUTES}
          onClose={handleDevMode}
          onAbort={handleDevMode}
          onProceed={handleDevMode}
        />
        <DeleteModal
          modalType={DeleteModalType.DELETE_EVENT}
          onClose={handleDevMode}
          onAbort={handleDevMode}
          onProceed={handleDevMode}
        />
        <DeleteModal
          modalType={DeleteModalType.LEAVE_MEETING_RECORD}
          onClose={handleDevMode}
          onAbort={handleDevMode}
          onProceed={handleDevMode}
        />
        <DeleteModal
          modalType={DeleteModalType.CONNECT_INSTAGRAM_ACCOUNT}
          onClose={handleDevMode}
          onAbort={handleDevMode}
          onProceed={handleDevMode}
        />
        <div /> {/* 빈 셀로 2행 3열 맞추기 */}
      </div>
      <span className="col-span-3 mb-2 text-center">Delete Modal</span>
      <div className="grid grid-cols-2 grid-rows-2 gap-4">
        <LoadingModal onClose={handleDevMode} modalType={LoadingModalType.CREATE_SURVEY} />
        <LoadingModal onClose={handleDevMode} modalType={LoadingModalType.MEETING_MINUTES} />
        <LoadingModal onClose={handleDevMode} modalType={LoadingModalType.SNS_EVENT} />
        <LoadingModal onClose={handleDevMode} modalType={LoadingModalType.FILE_DOWNLOAD} />
      </div>
    </div>
  );
};

export default TestModalsPage;
