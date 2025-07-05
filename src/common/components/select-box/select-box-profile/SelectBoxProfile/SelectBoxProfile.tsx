import Link from 'next/link';

import ProfileCircle from '@svgs/component-set/profileCircle.svg';

import AddMemberButton from '../AddMemberButton/AddMemberButton.client';
import FooterButtons from '../FooterButtons/FooterButtons.client';
import ProfileImage from '../ProfileImage/ProfileImage.client';
import WorkSpaceItem from '../WorkSpaceItem/WorkSpaceItem';

// 임시 데이터
const profile = {
  userId: 'user1234',
  imagePath: '/assets/images/profileImage.jpg',
  name: 'UMC 8기 운영진',
  email: 'tngh9509@gmail.com',
};

const workspaces = [
  { id: 'ws1', name: 'UMC 8기 운영진' },
  { id: 'ws2', name: 'Team Haru' },
  { id: 'ws3', name: '멋쟁이사자처럼 11기' },
  { id: 'ws4', name: '구름톤 유니브 6기' },
  { id: 'ws5', name: '구름톤 유니브 7기' },
  { id: 'ws6', name: '구름톤 유니브 8기' },
];

const SelectBoxProfile = () => {
  return (
    <div className="border-stroke-200 flex w-[302px] flex-col items-start gap-2.5 rounded-2xl border border-solid bg-white p-4 shadow-[2px_6px_24px_0px_rgba(0,0,0,0.10)]">
      <div className="flex flex-col items-start gap-2.5 self-stretch">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3.5">
            <ProfileImage userId={profile.userId} src={profile.imagePath} name={profile.name} />
            <div>
              <p className="self-stretch text-[15px] leading-[130%] font-semibold tracking-[-0.3px] text-black not-italic">
                {profile.name}
              </p>
              <p className="text-cap1-rg text-gray-400">{profile.email}</p>
            </div>
          </div>
          <div className="flex gap-[6px]">
            <Link
              href="/profile"
              className="border-stroke-200 flex h-7 items-center justify-center gap-[3px] rounded-[7px] border border-solid bg-white px-2 py-1.5"
            >
              <ProfileCircle height="16" width="16" />
              <span className="text-cap1-md text-gray-400">프로필 설정</span>
            </Link>
            <AddMemberButton />
          </div>
        </div>

        <div className="bg-stroke-200 h-px w-full"></div>

        <div className="w-full">
          <p className="text-cap2-md mb-[7px] px-2.5 text-gray-400">내 워크스페이스</p>
          {workspaces.map((ws) => (
            <WorkSpaceItem key={ws.id} id={ws.id} name={ws.name} />
          ))}
        </div>
      </div>

      <div className="bg-stroke-200 h-px w-full"></div>

      <FooterButtons />
    </div>
  );
};

export default SelectBoxProfile;
