// Request DTO
export interface CreateWorkspaceRequestDto {
  name: string;
  image: File | null;
}

export interface InviteMembersRequestDto {
  workspaceId: string;
  emails: string[];
}

export interface LinkInstagramRequestDto {
  workspaceId: string;
  instagramRedirectType: string;
  code: string;
}

// Response DTO
export interface CreateWorkspaceResponseDto {
  workspaceId: string;
  name: string;
  imageUrl: string;
}

export interface LinkInstagramResponseDto {
  instagramAccountName: string;
}
