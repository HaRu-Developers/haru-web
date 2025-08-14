import { Suspense } from 'react';

import CreatingEventModalClient from './CreatingEventModalClient';

const CreatingEventModalPage = () => {
  return (
    <Suspense fallback={<div>로딩중...</div>}>
      <CreatingEventModalClient />
    </Suspense>
  );
};

export default CreatingEventModalPage;
