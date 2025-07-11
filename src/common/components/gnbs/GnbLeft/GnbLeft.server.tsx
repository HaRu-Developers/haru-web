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
    <div className="border-r-stroke-200 h-full w-60 shrink-0 border-r border-solid">
      <div className="flex flex-col p-[16px]">
        <HaruLogoIcons
          state={HaruLogoIconsState.MIXED}
          className="mb-[6px] ml-[5px] h-[28px] w-[88px]"
        />
        <div className="flex flex-col gap-[16px]">
          <Profile userId={profile.userId} name={profile.name} email={profile.email} />
          <div className="flex flex-col items-start gap-2 self-stretch rounded-[10px]">
            {GnbLeftNavItems.map((item) => (
              <NavItem key={item} item={item} />
            ))}
          </div>
          <div className="bg-stroke-200 h-[1px] w-full shrink-0"></div>
        </div>
        <h4 className="mt-[12px] mb-[6px] ml-[12px] cursor-default text-[13px] leading-[130%] font-medium tracking-[-0.26px] text-gray-400 not-italic">
          recent
        </h4>
        <div className="flex w-[210px] flex-col items-start gap-1">
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
    </div>
  );
};

export default GnbLeft;
