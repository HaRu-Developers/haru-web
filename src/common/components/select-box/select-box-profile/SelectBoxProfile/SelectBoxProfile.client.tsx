'use client';

import { useRef } from 'react';

import useOutsideClick from '@common/hooks/useOutsideClick';

import ProfileImage from '@common/components/images/ProfileImage/ProfileImage.client';
import { ImageSize } from '@common/components/images/types/images.common.types';

import FooterButtons from '../FooterButtons/FooterButtons.client';
import HeaderButtons from '../HeaderButtons/HeaderButtons.client';
import WorkSpaceItem from '../WorkSpaceItem/WorkSpaceItem.client';

// 임시 데이터
const profile = {
  userId: '1n',
  imagePath: '/assets/images/profileImage.jpg',
  name: 'UMC 8기 운영진',
  email: 'tngh9509@gmail.com',
};

const workspaces = [
  {
    workspaceId: '1n',
    imagePath: '/assets/images/profileImage.jpg',
    title: 'UMC 8기 운영진 회의',
    isOwner: true,
  },
  {
    workspaceId: '2n',
    imagePath: '/assets/images/profileImage.jpg',
    title: 'Team-Haru 22차 전사회의',
    isOwner: false,
  },
  {
    workspaceId: '3n',
    imagePath: '/assets/images/profileImage.jpg',
    title: '멋쟁이사자처럼 11기',
    isOwner: false,
  },
  {
    workspaceId: '4n',
    imagePath: '/assets/images/profileImage.jpg',
    title: '구름톤 유니브 8기',
    isOwner: false,
  },
  {
    workspaceId: '5n',
    imagePath: '/assets/images/profileImage.jpg',
    title: '구름톤 유니브 7기',
    isOwner: false,
  },
  {
    workspaceId: '6n',
    imagePath: '/assets/images/profileImage.jpg',
    title: '구름톤 유니브 6기',
    isOwner: false,
  },
];

const SelectBoxProfile = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const boxRef = useRef<HTMLDivElement | null>(null);

  useOutsideClick(boxRef, () => {
    setIsOpen(false);
  });

  if (!isOpen) return null;

  return (
    <div
      ref={boxRef}
      className="border-stroke-200 shadow-dropdown-popup w-302pxr flex flex-col items-start gap-2.5 rounded-2xl border border-solid bg-white p-4"
    >
      <div className="flex flex-col items-start gap-2.5 self-stretch">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3.5">
            <ProfileImage
              userId={profile.userId}
              src={profile.imagePath}
              name={profile.name}
              size={ImageSize.LARGE}
            />
            <div>
              <p className="text-cap1-rg text-black">{profile.name}</p>
              <p className="text-cap2-rg text-gray-400">{profile.email}</p>
            </div>
          </div>
          <HeaderButtons />
        </div>

        <div className="bg-stroke-200 h-px w-full"></div>

        <div className="w-full">
          <p className="text-cap2-md mb-7pxr px-2.5 text-gray-400">내 워크스페이스</p>
          {workspaces.map((ws) => (
            <WorkSpaceItem
              key={ws.workspaceId}
              workspaceId={ws.workspaceId}
              imagePath={ws.imagePath}
              title={ws.title}
            />
          ))}
        </div>
      </div>

      <div className="bg-stroke-200 h-pxr w-full"></div>

      <FooterButtons />
    </div>
  );
};

export default SelectBoxProfile;
