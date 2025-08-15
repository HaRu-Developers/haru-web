'use client';

import { Suspense } from 'react';

import InnerAfterRegisterModal from '@features/auth/components/InnerAfterRegisterModal/InnerAfterRegisterModal.client';

const AfterRegisterModal = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <InnerAfterRegisterModal />
    </Suspense>
  );
};

export default AfterRegisterModal;
