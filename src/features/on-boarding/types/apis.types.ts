// Request DTO
export interface CreateWorkspaceRequestDto {
  name: string;
  image: File | null;
}

export interface InviteMembersRequestDto {
  workspaceId: number;
  emails: string[];
}

// Response DTO
export interface CreateWorkspaceResponseDto {
  workspaceId: number;
  name: string;
  imageUrl: string;
}
