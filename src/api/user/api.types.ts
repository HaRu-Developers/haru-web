export interface User {
  userId: string;
  email: string;
  name: string;
  imageUrl: string;
}

export interface fetchUpdateUserResquestDto {
  name: string;
  password: string;
}

export type fetchUserResponseDto = User;
