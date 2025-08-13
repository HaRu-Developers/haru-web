'use client';

import { useEffect, useState } from 'react';

import CrossIcons from '@icons/CrossIcons/CrossIcons';
import { CrossIconsState } from '@icons/CrossIcons/CrossIcons.types';

import { useUserActions } from '@common/hooks/stores/useUserStore';

import useFetchUserDetail from '@/api/user/get/queries/useFetchUserDetail';

import CommonText from '../CommonText/CommonText.client';
import { CommonTextType } from '../CommonText/CommonText.types';
import { ProfileSelectModalMenuState, ProfileSelectModalProps } from './ProfileSelectModal.types';
import { ProfileSelectModalMenuButton } from './ProfileSelectModalMenuButton/ProfileSelectModalMenuButton.client';
import ProfileSettingMenu from './ProfileSettingMenu/ProfileSettingMenu.client';
import WorkspaceSettingsMenu from './WorkspaceSettingsMenu/WorkspaceSettingsMenu.client';

const ProfileSelectModal = ({ workspaceId, onClose, onNextStep }: ProfileSelectModalProps) => {
  const [selectedMenu, setSelectedMenu] = useState<ProfileSelectModalMenuState>(
    ProfileSelectModalMenuState.WORKSPACE_SETTING,
  );
  const { setName } = useUserActions(); // 지금은 설정이지만 gnb 자체에서 해도 될 듯

  const { extra: user } = useFetchUserDetail();

  useEffect(() => {
    if (user && user.name) {
      setName(user.name);
    }
  }, [user, setName]);
  // 메뉴별 렌더 함수 (switch-case 또는 객체 맵핑)
  const renderMenuContent = () => {
    switch (selectedMenu) {
      case ProfileSelectModalMenuState.WORKSPACE_SETTING:
        return <WorkspaceSettingsMenu workspaceId={workspaceId} />;
      case ProfileSelectModalMenuState.PROFILE_SETTING:
        return (
          <ProfileSettingMenu
            workspaceId={workspaceId}
            email={user?.email || ''}
            instagramAccount="thejeewon" // 임시
          />
        );
      default:
        return null;
    }
  };

  const handleMenuClick = (menu: ProfileSelectModalMenuState) => {
    if (menu === ProfileSelectModalMenuState.LOGOUT) {
      alert('로그아웃합니다. UNIMPLEMENTED');
      onNextStep(); // 로그아웃 시 다음 단계로 이동
    }
    setSelectedMenu(menu);
  };

  return (
    <div className="rounded-16pxr w-800pxr shadow-modal flex flex-col items-center justify-center bg-white">
      {/* 상단 설정 */}
      <div className="px-24pxr pt-24pxr pb-10pxr border-stroke-200 h-66pxr flex w-full items-center justify-between border-b-1">
        <CommonText type={CommonTextType.T3_BD_BLACK} text="설정" />
        <button className="mr-2pxr" onClick={onClose}>
          <CrossIcons state={CrossIconsState.SIZE_20_GRAY_200} />
        </button>
      </div>
      {/* 본문 영역 */}
      <div className="h-614pxr flex w-full flex-row">
        {/* 본문 - 좌측 : 메뉴 선택 */}
        <div className="px-12pxr py-10pxr gap-y-4pxr border-stroke-200 flex flex-col border-r-1">
          <ProfileSelectModalMenuButton
            menuName={ProfileSelectModalMenuState.WORKSPACE_SETTING}
            isSelected={selectedMenu === ProfileSelectModalMenuState.WORKSPACE_SETTING}
            className="mb-8pxr"
            onClick={() => handleMenuClick(ProfileSelectModalMenuState.WORKSPACE_SETTING)}
          />
          <ProfileSelectModalMenuButton
            menuName={ProfileSelectModalMenuState.PROFILE_SETTING}
            isSelected={selectedMenu === ProfileSelectModalMenuState.PROFILE_SETTING}
            className="mb-8pxr"
            onClick={() => handleMenuClick(ProfileSelectModalMenuState.PROFILE_SETTING)}
          />
          <ProfileSelectModalMenuButton
            menuName={ProfileSelectModalMenuState.LOGOUT}
            isSelected={selectedMenu === ProfileSelectModalMenuState.LOGOUT}
            className="mt-8pxr"
            onClick={() => handleMenuClick(ProfileSelectModalMenuState.LOGOUT)}
          />
        </div>
        {/* 본문 - 우측 : 선택된 메뉴의 내용 */}
        {renderMenuContent()}
      </div>
    </div>
  );
};

export default ProfileSelectModal;
