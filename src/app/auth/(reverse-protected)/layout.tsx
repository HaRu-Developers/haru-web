import React from 'react';

import { ROUTES } from '@common/constants/routes.constants';

import ProtectChildren from '@features/auth/components/protect-routes/ProtectAuthPagesFromLoggedInUser/ProtectAuthPagesFromLoggedInUser.client';

const ProtectedAuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ProtectChildren
        protectMode={false}
        whiteList={[
          ROUTES.MODAL.AUTH.AFTER_REGISTER.INVITED_REGISTER,
          ROUTES.MODAL.AUTH.AFTER_REGISTER.NORMAL_REGISTER,
        ]}
      >
        <>{children}</>
      </ProtectChildren>
    </>
  );
};

export default ProtectedAuthLayout;
