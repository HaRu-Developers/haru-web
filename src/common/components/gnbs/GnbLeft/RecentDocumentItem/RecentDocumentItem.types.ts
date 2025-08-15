import { ApiDocument } from '@api/workspace/api.types';

export interface RecentDocumentItemProps extends ApiDocument {
  workspaceId: string;
}
