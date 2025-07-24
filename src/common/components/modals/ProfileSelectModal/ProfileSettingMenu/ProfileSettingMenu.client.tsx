'use client';

import ChangePasswordButton from '@common/components/buttons/30px/ChangePasswordButton/ChangePasswordButton.client';
import { ChangePasswordButtonState } from '@common/components/buttons/30px/ChangePasswordButton/ChangePasswordButton.types';
import SocialConnectButton from '@common/components/buttons/30px/SocialConnectButton/SocialConnectButton.client';
import SaveButton from '@common/components/buttons/38px/SaveButton/SaveButton.client';

import CommonText from '../../CommonText/CommonText.server';
import { CommonTextType } from '../../CommonText/CommonText.types';
import { ConnectInstagramAccount } from '../../DeleteModal/DeleteModal.stories';

interface ProfileSettingMenuProps {
  name: string;
  email: string;
  instagramAccount?: string;
}

const ProfileSettingMenu = ({ name, email, instagramAccount }: ProfileSettingMenuProps) => {
  return (
    <div className="px-35pxr py-24pxr gap-y-24pxr flex w-full flex-col">
      <CommonText type={CommonTextType.T4_BD_BLACK} text="프로필 설정" />

      {/* 계정 정보 영역 */}
      <div className="flex w-full flex-col">
        <CommonText type={CommonTextType.T5_SB_BLACK} text="계정 정보" />
        <div className="gap-y-16pxr mt-12pxr flex w-full flex-col">
          {/* 이름 */}
          <div className="gap-y-8pxr flex w-full flex-col items-start justify-center">
            <CommonText type={CommonTextType.CAP1_RG_GRAY_200} text="이름" />
            <span className="border-stroke-200 rounded-4pxr px-10pxr text-b3-rg py-7pxr flex w-full items-start justify-start border text-black">
              {name}
            </span>
          </div>

          {/* 이메일 주소 */}
          <div className="gap-y-8pxr flex w-full flex-col items-start justify-center">
            <CommonText type={CommonTextType.CAP1_RG_GRAY_200} text="이메일 주소" />
            <span className="border-stroke-200 rounded-4pxr px-10pxr text-b3-rg py-7pxr flex w-full items-start justify-start border text-black">
              {email}
            </span>
          </div>

          {/* 비밀번호 변경 */}
          <div className="gap-y-8pxr flex flex-col">
            <CommonText type={CommonTextType.CAP1_RG_GRAY_200} text="비밀번호" />
            <ChangePasswordButton
              onClick={() => {}}
              state={ChangePasswordButtonState.COLOR_WHITE}
            />
          </div>
        </div>
      </div>

      {/* SNS 연동 영역 */}
      <div className="mt-24pxr flex flex-col">
        <CommonText type={CommonTextType.T5_SB_BLACK} text="SNS 연동" />
        {/* 연동된 인스타 계정 */}
        <CommonText
          type={CommonTextType.CAP1_RG_GRAY_200}
          text="연동된 Instagram 계정"
          className="mt-12pxr mb-8pxr"
        />
        {/* <연동헤제 + 계정변경 OR 연동하기 버튼 */}
        {instagramAccount ? (
          <div className="gap-y-8pxr flex flex-col">
            <span className="border-stroke-200 rounded-4pxr px-10pxr text-b3-rg py-7pxr flex w-full items-start justify-start border text-black">
              {instagramAccount}
            </span>
            <div className="gap-x-12pxr flex flex-row items-center justify-start">
              <button className="text-cap1-md text-gray-200 underline">연동 해제</button>
              <button className="text-cap1-md text-gray-200 underline">계정 변경</button>
            </div>
          </div>
        ) : (
          <SocialConnectButton onClick={() => {}} />
        )}
      </div>
      {/* 저장하기 버튼 */}
      <SaveButton onClick={() => {}} className="my-40pxr" />
    </div>
  );
};

export default ProfileSettingMenu;
