'use client';

import { useState } from 'react';

import ArrowIcons from '@icons/ArrowIcons/ArrowIcons';
import { ArrowIconsState } from '@icons/ArrowIcons/ArrowIcons.types';

import WorkspaceProfileImage from '@common/components/images/WorkspaceProfileImage/WorkspaceProfileImage.client';
import SelectBoxProfile from '@common/components/select-box/SelectBoxProfile/SelectBoxProfile.server';

const WorkSpaceProfile = () => {
  const [isOpenSelectBoxProfile, setIsOpenSelectBoxProfile] = useState(false);

  const handleClick = () => {
    setIsOpenSelectBoxProfile(!isOpenSelectBoxProfile);
  };

  // 임시 데이터
  const workspace = {
    workspaceId: '1n',
    title: 'UMC 8기 운영진',
    imagePath: '/assets/images/profileImage.jpg',
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
              workspaceId={workspace.workspaceId}
              src={workspace.imagePath}
              title={workspace.title}
              className="w-20pxr h-20pxr rounded-100pxr text-cap3-rg"
            />
            <p className="text-cap1-rg text-black">{workspace.title}</p>
          </div>
          <ArrowIcons state={ArrowIconsState.DOWN} />
        </div>
      </button>
      {isOpenSelectBoxProfile && (
        <SelectBoxProfile isOpen={isOpenSelectBoxProfile} setIsOpen={setIsOpenSelectBoxProfile} />
      )}
    </div>
  );
};

export default WorkSpaceProfile;
