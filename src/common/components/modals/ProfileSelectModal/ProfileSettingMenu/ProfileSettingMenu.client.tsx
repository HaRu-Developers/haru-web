'use client';

import { useCallback, useEffect } from 'react';

import { useRouter } from 'next/navigation';

import { ToastType } from '@common/types/toast.types';

import { ROUTES } from '@common/constants/routes.constants';

import { useToastActions } from '@common/hooks/stores/useToastStore';
import { useUserActions, useUserInfo } from '@common/hooks/stores/useUserStore';

import ChangePasswordButton from '@common/components/buttons/30px/ChangePasswordButton/ChangePasswordButton.client';
import { ChangePasswordButtonState } from '@common/components/buttons/30px/ChangePasswordButton/ChangePasswordButton.types';
import SocialConnectButton from '@common/components/buttons/30px/SocialConnectButton/SocialConnectButton.client';
import SaveButton from '@common/components/buttons/38px/SaveButton/SaveButton.client';

import useEditUserDetail from '@/api/user/patch/mutations/useEditUserDetail';

import CommonText from '../../CommonText/CommonText.client';
import { CommonTextType } from '../../CommonText/CommonText.types';
import { ProfileSettingMenuProps } from './ProfileSettingMenu.types';

const ProfileSettingMenu = ({ workspaceId, email, instagramAccount }: ProfileSettingMenuProps) => {
  const { name, password } = useUserInfo();
  const { setName } = useUserActions();
  const { addToast } = useToastActions();
  const router = useRouter();
  const handlePasswordModal = () => {
    router.push(ROUTES.MODAL.SETTING.PASSWORD_CHANGE(workspaceId));
  };
  const { mutate: editUserDetail } = useEditUserDetail();
  const handleSave = useCallback(() => {
    console.log(name, password);
    if (name && password) {
      editUserDetail(
        { name, password },
        {
          onSuccess: (data) => {
            addToast({
              text: `사용자 정보가 성공적으로 수정되었습니다.`,
              type: [ToastType.SUCCESS][Date.now() % 3],
              duration: 2000,
            });
          },
          onError: (error) => {
            addToast({
              text: `사용자 정보 수정에 실패했습니다: ${error.message}`,
              type: [ToastType.ERROR][Date.now() % 3],
              duration: 2000,
            });
          },
        },
      );
    } else {
      addToast({
        text: '이름과 비밀번호를 모두 입력해주세요.',
        type: [ToastType.INFO][Date.now() % 3],
        duration: 2000,
      });
    }
  }, [editUserDetail, name, password]);
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
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="border-stroke-200 rounded-4pxr px-10pxr text-b3-rg py-7pxr flex w-full items-start justify-start border text-black"
            />
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
              onClick={handlePasswordModal}
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
      <SaveButton onClick={handleSave} className="my-40pxr" />
    </div>
  );
};

export default ProfileSettingMenu;
