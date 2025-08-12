import { FileType } from '@common/types/file-type.enum';

export interface FeatureTextProps {
  fileType: FileType;
  isFlip?: boolean;
  onClick?: () => void;
}
