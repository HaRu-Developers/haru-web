import { Suspense } from 'react';

import NewEventModalClient from '@features/sns-event-assistant/components/modal-client/NewEventModalClient/NewEventModalClient';

const NewEventModalPage = () => {
  return (
    <Suspense fallback={<div>로딩중...</div>}>
      <NewEventModalClient />
    </Suspense>
  );
};

export default NewEventModalPage;
