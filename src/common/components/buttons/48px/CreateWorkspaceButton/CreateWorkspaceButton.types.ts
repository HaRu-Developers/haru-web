import { ButtonsCommonProps } from '../../types/buttons.common.types';

export enum CreateWorkspaceButtonState {
  WIDTH_260PXR = 'w-260pxr',
  WIDTH_214PXR = 'w-214pxr',
}
export interface CreateWorkspaceButtonProps extends ButtonsCommonProps {
  disabled?: boolean;
  state: CreateWorkspaceButtonState;
}
