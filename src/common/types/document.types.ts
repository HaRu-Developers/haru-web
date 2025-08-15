import { FileType } from '@common/types/file-type.enum';

export interface Document {
  documentId: string;
  title: string;
  documentType: FileType;
  createdAt: string;
}
