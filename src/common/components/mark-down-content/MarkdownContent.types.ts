import { FileType } from '@common/types/file-type.enum';

export interface MarkdownContentProps {
  content: string;
  variant?: FileType;
}
