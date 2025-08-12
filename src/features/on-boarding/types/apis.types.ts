// Request DTO
export interface CreateWorkspaceRequestDto {
  name: string;
  image: File | null;
}

export interface InviteMembersRequestDto {
  workspaceId: string;
  emails: string[];
}

// Response DTO
export interface CreateWorkspaceResponseDto {
  workspaceId: string;
  name: string;
  imageUrl: string;
}
