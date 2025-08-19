import { FileType } from '@common/types/file-type.enum';

export interface DocumentList {
  documentId: string;
  title: string;
  documentType: FileType;
  createdAt: string;
}
