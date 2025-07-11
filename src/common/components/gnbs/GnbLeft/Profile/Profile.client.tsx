'use client';

import ArrowIcons from '@icons/ArrowIcons/ArrowIcons';
import { ArrowIconsState } from '@icons/ArrowIcons/ArrowIcons.types';

import DefaultProfileImage from '@common/components/DefaultProfileImage/DefaultProfileImage.server';

import { ProfileProps } from './Profile.types';

const Profile = ({ userId, name, email }: ProfileProps) => {
  const handleClick = () => {
    console.log('open selectbox profile');
  };

  return (
    <button
      className="flex h-[46px] w-52 shrink-0 flex-col items-start justify-center px-[7px] py-[5px]"
      onClick={handleClick}
    >
      <div className="flex items-center justify-between self-stretch">
        <div className="flex items-center gap-2 text-black">
          <DefaultProfileImage userId={userId} name={name} size="small" />
          <span className="flex flex-col text-start">
            <p className="self-stretch [font-family:Pretendard] text-[13px] leading-[130%] font-normal tracking-[-0.26px] text-[color:var(--Black,#111)] not-italic">
              {name}
            </p>
            <p className="[font-family:Pretendard] text-xs leading-[130%] font-normal text-[color:var(--Gray-300,#767676)] not-italic">
              {email}
            </p>
          </span>
        </div>
        <ArrowIcons state={ArrowIconsState.DOWN} />
      </div>
    </button>
  );
};

export default Profile;
