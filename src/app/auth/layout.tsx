import React from 'react';

const AuthLayout = ({
  children,
  authModal,
}: {
  children: React.ReactNode;
  authModal: React.ReactNode;
}) => {
  return (
    <>
      {children}
      {authModal}
    </>
  );
};

export default AuthLayout;
