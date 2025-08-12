import { FileType } from '@common/types/file-type.enum';

export interface SearchResultCardProps {
  fileType: FileType;
  title: string;
  lastOpened: string;
  onClick: () => void;
}
