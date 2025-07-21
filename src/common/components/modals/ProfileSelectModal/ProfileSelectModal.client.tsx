import { useState } from 'react';

import CrossIcons from '@icons/CrossIcons/CrossIcons';
import { CrossIconsState } from '@icons/CrossIcons/CrossIcons.types';

import CommonText from '../CommonText/CommonText.server';
import { CommonTextType } from '../CommonText/CommonText.types';
import {
  ProfileSelectModalMenu,
  ProfileSelectModalMenuState,
  ProfileSelectModalProps,
} from './ProfileSelectModal.types';
import { ProfileSelectModalMenuButton } from './ProfileSelectModalMenuButton/ProfileSelectModalMenuButton';
import WorkspaceSettingsMenu from './WorkspaceSettingsMenu/WorkspaceSettingsMenu.client';

const ProfileSelectModal = ({ onClose, onNextStep }: ProfileSelectModalProps) => {
  const [selectedMenu, setSelectedMenu] = useState<ProfileSelectModalMenuState>(
    ProfileSelectModalMenuState.WORKSPACE_SETTING,
  );

  const MENU_LIST: ProfileSelectModalMenu[] = [
    {
      type: ProfileSelectModalMenuState.WORKSPACE_SETTING,
      isSelected: selectedMenu === ProfileSelectModalMenuState.WORKSPACE_SETTING,
    },
    {
      type: ProfileSelectModalMenuState.PROFILE_SETTING,
      isSelected: selectedMenu === ProfileSelectModalMenuState.PROFILE_SETTING,
    },
    {
      type: ProfileSelectModalMenuState.LOGOUT,
      isSelected: selectedMenu === ProfileSelectModalMenuState.LOGOUT,
    },
  ];

  // 메뉴별 렌더 함수 (switch-case 또는 객체 맵핑)
  const renderMenuContent = () => {
    switch (selectedMenu) {
      case ProfileSelectModalMenuState.WORKSPACE_SETTING:
        return <WorkspaceSettingsMenu workspaceName="MOCK_WORKSPACE" />;
      case ProfileSelectModalMenuState.PROFILE_SETTING:
        return <CommonText type={CommonTextType.T5_SB_BLACK} text="프로필 설정" />;
      case ProfileSelectModalMenuState.LOGOUT:
        return <CommonText type={CommonTextType.T5_SB_BLACK} text="로그아웃" />;
      default:
        return null;
    }
  };

  return (
    <div className="rounded-16pxr w-800pxr shadow-modal flex flex-col items-center justify-center">
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
          {MENU_LIST.map((menu) => (
            <ProfileSelectModalMenuButton
              key={menu.type}
              menuName={menu.type}
              isSelected={menu.isSelected}
              className="mb-8pxr"
              onClick={() => setSelectedMenu(menu.type)}
            />
          ))}
        </div>
        {/* 본문 - 우측 : 선택된 메뉴의 내용 */}
        {renderMenuContent()}
      </div>
    </div>
  );
};

export default ProfileSelectModal;
