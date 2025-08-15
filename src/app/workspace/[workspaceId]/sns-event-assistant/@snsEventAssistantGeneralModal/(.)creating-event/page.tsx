import { Suspense } from 'react';

import CreatingEventModalClient from '../../../../../../features/sns-event-assistant/components/modal-client/CreatingEventModalClient/CreatingEventModalClient';

const CreatingEventModalPage = () => {
  return (
    <Suspense fallback={<div>로딩중...</div>}>
      <CreatingEventModalClient />
    </Suspense>
  );
};

export default CreatingEventModalPage;
