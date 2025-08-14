import { Suspense } from 'react';

import NewEventModalClient from './NewEventModalClient';

const NewEventModalPage = () => {
  return (
    <Suspense fallback={<div>로딩중...</div>}>
      <NewEventModalClient />
    </Suspense>
  );
};

export default NewEventModalPage;
