// Request DTO
export interface UpdateUserRequestDto {
  name: string;
  password: string;
}

export interface UpdateWorkspaceRequestDto {
  title: string;
  image: File | null;
}

// Response DTO
export interface UserResponseDto {
  userId: string;
  email: string;
  name: string;
  imageUrl: string | null;
}

export interface UpdateWorkspaceResponseDto {
  workspaceId: number;
  title: string;
  imageUrl: string;
}

export interface ReadWorkspaceResponseDto {
  workspaceId: number;
  title: string;
  imageUrl: string;
  isOwner: boolean;
}
