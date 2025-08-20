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

export interface PasswordCheckRequestDto {
  requestPassword: string;
}

export interface PasswordCheckResponseDto {
  isMatched: boolean;
}

export interface UserListFromEmailRequestDto {
  email: string;
}

export type UserListFromEmailResponseDto = User[];
