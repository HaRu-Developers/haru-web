import { ButtonsCommonProps } from '../../types/buttons.common.types';

export enum FileDownloadButtonType {
  PDF = 'pdf',
  WORD = 'word',
}
export interface FileDownloadButtonProps extends ButtonsCommonProps {
  buttonType: FileDownloadButtonType;
}
