'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import ArrowIcons from '@icons/ArrowIcons/ArrowIcons';
import { ArrowIconsState } from '@icons/ArrowIcons/ArrowIcons.types';

import WorkspaceProfileImage from '@common/components/images/WorkspaceProfileImage/WorkspaceProfileImage.client';
import SelectBoxProfile from '@common/components/select-box/SelectBoxProfile/SelectBoxProfile.server';

import { WorkspaceProfileProps } from './WorkspaceProfile.types';

const WorkSpaceProfile = ({ workspaceId }: WorkspaceProfileProps) => {
  const router = useRouter();
  const [isOpenSelectBoxProfile, setIsOpenSelectBoxProfile] = useState(false);

  const handleClick = () => {
    setIsOpenSelectBoxProfile(!isOpenSelectBoxProfile);
  };

  const handleSettingClick = () => {
    if (workspaceId) {
      router.push(`/workspace/${workspaceId}/settings`);
    } else {
      router.push(`/workspace/settings`);
    }
  };
  // 임시 데이터
  const workspace = {
    workspaceId: '1n',
    title: 'UMC 8기 운영진',
    imagePath: null,
    isOwner: true,
  };

  return (
    <div className="relative">
      <button
        className="h-46pxr px-7pxr py-5pxr flex w-52 shrink-0 flex-col items-start justify-center"
        onClick={handleClick}
      >
        <div className="flex items-center justify-between self-stretch">
          <div className="flex items-center gap-2">
            <WorkspaceProfileImage
              src={workspace.imagePath}
              title={workspace.title}
              className="w-20pxr h-20pxr text-cap2-rg"
              border
            />
            <p className="text-cap1-rg text-black">{workspace.title}</p>
          </div>
          <ArrowIcons state={ArrowIconsState.DOWN} />
        </div>
      </button>
      {isOpenSelectBoxProfile && (
        <SelectBoxProfile
          isOpen={isOpenSelectBoxProfile}
          setIsOpen={setIsOpenSelectBoxProfile}
          onSettingClick={handleSettingClick}
        />
      )}
    </div>
  );
};

export default WorkSpaceProfile;
