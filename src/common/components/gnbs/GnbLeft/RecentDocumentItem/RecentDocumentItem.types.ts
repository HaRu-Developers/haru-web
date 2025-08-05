import { FileType } from '@common/types/file-type.enum';

export interface RecentDocumentItemProps {
  workspaceId: number | null;
  documentType: FileType;
  documentId: number;
  title: string;
}
