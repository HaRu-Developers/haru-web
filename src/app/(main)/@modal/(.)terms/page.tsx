import { Suspense } from 'react';

import TermsModalClient from './TermsModalClient';

const TermsModalPage = () => {
  return (
    <Suspense fallback={<div>로딩중...</div>}>
      <TermsModalClient />
    </Suspense>
  );
};

export default TermsModalPage;
