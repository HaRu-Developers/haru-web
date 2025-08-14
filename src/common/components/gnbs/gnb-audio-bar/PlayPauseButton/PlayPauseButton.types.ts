import { ButtonsCommonProps } from '@common/components/buttons/types/buttons.common.types';

export enum PlayPauseButtonStatus {
  PLAY = 'PLAY',
  PAUSE = 'PAUSE',
}
export interface PlayPauseButtonProps extends ButtonsCommonProps {
  status: PlayPauseButtonStatus;
}
