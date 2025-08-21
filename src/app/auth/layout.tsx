import React from 'react';

import { ROUTES } from '@common/constants/routes.constants';

import ProtectChildren from '@features/auth/components/protect-routes/ProtectChildren/ProtectChildren.client';

const AuthLayout = ({
  children,
  authModal,
}: {
  children: React.ReactNode;
  authModal: React.ReactNode;
}) => {
  return (
    <>
      <ProtectChildren
        protectMode={false}
        whitelist={[
          ROUTES.MODAL.AUTH.AFTER_REGISTER.INVITED_REGISTER,
          ROUTES.MODAL.AUTH.AFTER_REGISTER.NORMAL_REGISTER,
          ROUTES.AUTH.REGISTER,
          '/auth/after-register',
        ]}
      >
        <>
          {children}
          {authModal}
        </>
      </ProtectChildren>
    </>
  );
};

export default AuthLayout;
