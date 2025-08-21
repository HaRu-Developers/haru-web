'use client';

import { useParams } from 'next/navigation';

export const useWorkspaceId = () => {
  const params = useParams<{ workspaceId: string }>();

  return {
    workspaceId: params.workspaceId,
  };
};
