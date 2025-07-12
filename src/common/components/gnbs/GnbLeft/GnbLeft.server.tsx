import HaruLogoIcons from '@icons/logos/HaruLogoIcons/HaruLogoIcons';
import { HaruLogoIconsState } from '@icons/logos/HaruLogoIcons/HaruLogoIcons.types';

import { GnbLeftNavItems } from '@common/constants/gnbs';

import NavItem from './NavItem/NavItem.client';
import Profile from './Profile/Profile.client';
import RecentWorkspace from './RecentWorkspace/RecentWorkspace.server';

const GnbLeft = () => {
  // 임시 데이터
  const profile = {
    userId: 10n,
    imagePath: '/assets/images/profileImage.jpg',
    name: 'UMC 8기 운영진',
    email: 'tngh9509@gmail.com',
  };

  const workspaces = [
    {
      workspaceId: 1n,
      title: 'UMC 8기 운영진 회의',
      isOwner: true,
    },
    {
      workspaceId: 2n,
      title: 'Team-Haru 22차 전사회의',
      isOwner: false,
    },
  ];

  return (
    <div className="border-stroke-200 p-16pxr flex w-60 shrink-0 flex-col border-r border-solid">
      <HaruLogoIcons state={HaruLogoIconsState.MIXED} className="mb-6pxr ml-5pxr h-28pxr w-88pxr" />
      <div className="gap-16pxr flex flex-col">
        <Profile userId={profile.userId} name={profile.name} email={profile.email} />
        <div className="rounded-10pxr flex flex-col items-start gap-2 self-stretch">
          {GnbLeftNavItems.map((item) => (
            <NavItem key={item} item={item} />
          ))}
        </div>
        <div className="bg-stroke-200 h-1pxr w-full shrink-0"></div>
      </div>
      <h4 className="text-cap1-md mt-12pxr mb-6pxr ml-12pxr cursor-default text-gray-400">
        recent
      </h4>
      <div className="w-210pxr flex flex-col items-start gap-1">
        {workspaces.map((workspace) => (
          <RecentWorkspace
            key={workspace.workspaceId}
            workspaceId={workspace.workspaceId}
            title={workspace.title}
            isOwner={workspace.isOwner}
          />
        ))}
      </div>
    </div>
  );
};

export default GnbLeft;
