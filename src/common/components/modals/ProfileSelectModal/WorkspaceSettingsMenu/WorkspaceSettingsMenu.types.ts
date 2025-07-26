export interface Teammate {
  name: string;
  userId: bigint;
  email: string;
}

export interface WorkspaceSettingsMenuProps {
  workspaceId: string;
  imageUrl?: string; // Optional prop for workspace image URL
  title: string; // Optional prop for workspace name
  teammateList?: Teammate[]; // Optional prop for teammate list
}
