'use client';

import { useRouter } from 'next/navigation';

import { ROUTES } from '@common/constants/routes.constants';

import CreateWorkspaceButton from '@common/components/buttons/38px/CreateWorkspaceButton/CreateWorkSpaceButton.client';

const CreateWorkspaceButtonWrapper = () => {
  const Rotuer = useRouter();

  return <CreateWorkspaceButton onClick={() => Rotuer.push(ROUTES.ONBOARDING)} />;
};

export default CreateWorkspaceButtonWrapper;