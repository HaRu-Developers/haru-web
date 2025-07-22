export interface Teammate {
  name: string;
  userId: bigint;
  email: string;
}

export interface WorkspaceSettingsMenuProps {
  imageUrl?: string; // Optional prop for workspace image URL
  workspaceName: string; // Optional prop for workspace name
  teammateList?: Teammate[]; // Optional prop for teammate list
}
