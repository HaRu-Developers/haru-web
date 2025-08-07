import { FileType } from '@common/types/file-type.enum';

export interface DocumentList {
  documentId: number;
  title: string;
  documentType: FileType;
  createdAt: string;
}
