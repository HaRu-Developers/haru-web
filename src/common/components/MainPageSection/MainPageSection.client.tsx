'use client';

import { useEffect } from 'react';

import { useRouter } from 'next/navigation';

import useFetchMyWorkspaces from '@api/workspace/get/queries/useFetchMyWorkspaces';

import { ROUTES } from '@common/constants/routes.constants';

import WithoutWorkspaceSection from './WithoutWorkspaceSection/WithoutWorkspaceSection.client';

const MainPageSection = () => {
  const router = useRouter();
  const { extra: myWorkspaces, isFetching } = useFetchMyWorkspaces();

  useEffect(() => {
    if (!isFetching && myWorkspaces && myWorkspaces?.length > 0) {
      const id = myWorkspaces[0]?.workspaceId;
      router.replace(ROUTES.WORKSPACE_MAIN(id));
    }
  }, [isFetching, myWorkspaces, router]);

  if (isFetching) return <p className="p-50pxr">로드 중...</p>;

  return <WithoutWorkspaceSection />;
};

export default MainPageSection;
