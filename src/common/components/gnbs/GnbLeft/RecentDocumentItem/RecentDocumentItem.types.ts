import { Document } from '@api/workspace/api.types';

export interface RecentDocumentItemProps extends Document {
  workspaceId: string;
}
