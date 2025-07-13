import Link from 'next/link';

import ProfileDropdownIcons from '@icons/ProfileDropdownIcons/ProfileDropdownIcons';
import { ProfileDropdownIconsState } from '@icons/ProfileDropdownIcons/ProfileDropdownIcons.types';

import AddMemberButton from '../AddMemberButton/AddMemberButton.client';
import FooterButtons from '../FooterButtons/FooterButtons.client';
import ProfileImage from '../ProfileImage/ProfileImage.client';
import WorkSpaceItem from '../WorkSpaceItem/WorkSpaceItem.server';

// 임시 데이터
const profile = {
  userId: 1n,
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
  {
    workspaceId: 3n,
    title: '멋쟁이사자처럼 11기',
    isOwner: false,
  },
  {
    workspaceId: 4n,
    title: '구름톤 유니브 8기',
    isOwner: false,
  },
  {
    workspaceId: 5n,
    title: '구름톤 유니브 7기',
    isOwner: false,
  },
  {
    workspaceId: 6n,
    title: '구름톤 유니브 6기',
    isOwner: false,
  },
];

const SelectBoxProfile = () => {
  return (
    <div className="border-stroke-200 shadow-dropdown-popup w-302pxr flex flex-col items-start gap-2.5 rounded-2xl border border-solid bg-white p-4">
      <div className="flex flex-col items-start gap-2.5 self-stretch">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3.5">
            <ProfileImage userId={profile.userId} src={profile.imagePath} name={profile.name} />
            <div>
              <p className="text-cap1-rg text-black">{profile.name}</p>
              <p className="text-cap2-rg text-gray-400">{profile.email}</p>
            </div>
          </div>
          <div className="gap-6pxr flex">
            <Link
              href="/profile"
              className="border-stroke-200 gap-3pxr rounded-7pxr flex h-7 items-center justify-center border border-solid bg-white px-2 py-1.5"
            >
              <ProfileDropdownIcons state={ProfileDropdownIconsState.PROFILE} />
              <span className="text-cap1-md text-gray-400">프로필 설정</span>
            </Link>
            <AddMemberButton />
          </div>
        </div>

        <div className="bg-stroke-200 h-px w-full"></div>

        <div className="w-full">
          <p className="text-cap2-md mb-7pxr px-2.5 text-gray-400">내 워크스페이스</p>
          {workspaces.map((ws) => (
            <WorkSpaceItem key={ws.workspaceId} workspaceId={ws.workspaceId} title={ws.title} />
          ))}
        </div>
      </div>

      <div className="bg-stroke-200 h-pxr w-full"></div>

      <FooterButtons />
    </div>
  );
};

export default SelectBoxProfile;
