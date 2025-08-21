import { Suspense } from 'react';

import DeleteEventModalClient from '@features/sns-event-assistant/components/modal-client/DeleteEventModalClient/DeleteEventModalClient';

const DeleteModalPage = () => {
  return (
    <Suspense fallback={<div>로딩중...</div>}>
      <DeleteEventModalClient />
    </Suspense>
  );
};

export default DeleteModalPage;
