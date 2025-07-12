'use client';

import DeleteModal from '@common/components/modals/DeleteModal/DeleteModal.client';
import { DeleteModalType } from '@common/components/modals/DeleteModal/DeleteModal.types';

const ModalTestPage = () => {
  const handleDevMode = () => console.log('Something Clicked');

  return (
    <div className="space-y-10pxr grid grid-rows-3">
      <p>Modal Page</p>
      <DeleteModal
        deleteModalType={DeleteModalType.DELETE_REPORT}
        onClose={handleDevMode}
        onAbort={handleDevMode}
        onProceed={handleDevMode}
      />
      <DeleteModal
        deleteModalType={DeleteModalType.DELETE_MEETING_MINUTES}
        onClose={handleDevMode}
        onAbort={handleDevMode}
        onProceed={handleDevMode}
      />
      <DeleteModal
        deleteModalType={DeleteModalType.DELETE_EVENT}
        onClose={handleDevMode}
        onAbort={handleDevMode}
        onProceed={handleDevMode}
      />
      <DeleteModal
        deleteModalType={DeleteModalType.LEAVE_MEETING_RECORD}
        onClose={handleDevMode}
        onAbort={handleDevMode}
        onProceed={handleDevMode}
      />
      <DeleteModal
        deleteModalType={DeleteModalType.CONNECT_INSTAGRAM_ACCOUNT}
        onClose={handleDevMode}
        onAbort={handleDevMode}
        onProceed={handleDevMode}
      />
    </div>
  );
};

export default ModalTestPage;
