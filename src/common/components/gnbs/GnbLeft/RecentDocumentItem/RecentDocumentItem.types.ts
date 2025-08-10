import { FileType } from '@common/types/file-type.enum';

export interface RecentDocumentItemProps {
  workspaceId: string;
  documentType: FileType;
  documentId: string;
  title: string;
}
