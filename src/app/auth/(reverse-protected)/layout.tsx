import React from 'react';

const ProtectedAuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {/*<ProtectChildren*/}
      {/*  protectMode={false}*/}
      {/*  whiteList={[*/}
      {/*    ROUTES.MODAL.AUTH.AFTER_REGISTER.INVITED_REGISTER,*/}
      {/*    ROUTES.MODAL.AUTH.AFTER_REGISTER.NORMAL_REGISTER,*/}
      {/*  ]}*/}
      {/*>*/}
      <>{children}</>
      {/*</ProtectChildren>*/}
    </>
  );
};

export default ProtectedAuthLayout;
