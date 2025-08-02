'use client';

import { notFound, useParams } from 'next/navigation';

import HaruLogoIcons from '@icons/logos/HaruLogoIcons/HaruLogoIcons';
import { HaruLogoIconsState } from '@icons/logos/HaruLogoIcons/HaruLogoIcons.types';

import { GnbLeftNavItems } from '@common/constants/gnbs.constants';

import NavItem from './NavItem/NavItem.client';
import RecentDocumentsSection from './RecentDocumentsSection/RecentDocumentsSection.server';
import WorkSpaceProfile from './WorkspaceProfile/WorkspaceProfile.client';

const GnbLeft = () => {
  const params = useParams<{ workspaceId?: string }>();
  const workspaceId = params.workspaceId ? Number(params.workspaceId) : null;

  // NaN이면 not-found.tsx로 이동
  if (params.workspaceId && Number.isNaN(workspaceId)) {
    notFound();
  }

  return (
    <div className="border-stroke-200 p-16pxr flex w-60 shrink-0 flex-col border-r border-solid">
      <HaruLogoIcons
        state={HaruLogoIconsState.MIXED}
        className="w-99pxr h-24pxr mb-8pxr mt-5pxr ml-5pxr"
      />
      <div className="gap-16pxr flex flex-col">
        <WorkSpaceProfile />
        <div className="rounded-10pxr flex flex-col items-start gap-2 self-stretch">
          {GnbLeftNavItems.map((item) => (
            <NavItem key={item} item={item} workspaceId={workspaceId} />
          ))}
        </div>
        <div className="bg-stroke-200 h-1pxr w-full shrink-0"></div>
      </div>
      {workspaceId && <RecentDocumentsSection workspaceId={workspaceId} />}
    </div>
  );
};

export default GnbLeft;
