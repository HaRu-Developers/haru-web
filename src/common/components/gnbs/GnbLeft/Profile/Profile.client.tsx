'use client';

import { useState } from 'react';

import ArrowIcons from '@icons/ArrowIcons/ArrowIcons';
import { ArrowIconsState } from '@icons/ArrowIcons/ArrowIcons.types';

import DefaultProfileImage from '@common/components/DefaultProfileImage/DefaultProfileImage.server';
import SelectBoxProfile from '@common/components/select-box/select-box-profile/SelectBoxProfile/SelectBoxProfile.server';

import { ProfileProps } from './Profile.types';

const Profile = ({ userId, name, email }: ProfileProps) => {
  const [isOpenSelectBoxProfile, setIsOpenSelectBoxProfile] = useState<boolean>(false);

  const handleClick = () => {
    setIsOpenSelectBoxProfile(!isOpenSelectBoxProfile);
  };

  return (
    <div className="relative">
      <button
        className="h-46pxr px-7pxr py-5pxr flex w-52 shrink-0 flex-col items-start justify-center"
        onClick={handleClick}
      >
        <div className="flex items-center justify-between self-stretch">
          <div className="flex items-center gap-2">
            <DefaultProfileImage userId={userId} name={name} size="small" />
            <span className="flex flex-col text-start">
              <p className="text-cap1-rg text-black">{name}</p>
              <p className="text-cap2-rg text-gray-300">{email}</p>
            </span>
          </div>
          <ArrowIcons state={ArrowIconsState.DOWN} />
        </div>
      </button>
      {isOpenSelectBoxProfile && (
        <div className="absolute top-full left-0 z-1 mt-1">
          <SelectBoxProfile />
        </div>
      )}
    </div>
  );
};

export default Profile;
