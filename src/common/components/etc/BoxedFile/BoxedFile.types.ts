import { FileType } from '@common/types/file-type.enum';

export interface BoxedFileProps {
  title: string;
  lastOpened?: string;
  thumbnailUrl?: string;
  documentType: FileType;
  onClick: () => void;
}
