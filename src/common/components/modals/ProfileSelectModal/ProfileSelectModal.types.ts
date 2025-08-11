export enum ProfileSelectModalMenuState {
  WORKSPACE_SETTING = '워크스페이스 설정',
  PROFILE_SETTING = '프로필 설정',
  LOGOUT = '로그아웃',
}
export interface ProfileSelectModalMenu {
  type: ProfileSelectModalMenuState;
  isSelected: boolean;
}

export interface ProfileSelectModalProps {
  workspaceId: string;
  onClose: () => void;
  onNextStep: () => void;
}
