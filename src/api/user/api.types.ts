export interface User {
  userId: number;
  email: string;
  name: string;
  imageUrl: string;
}

export interface fetchUpdateUserResquestDto {
  name: string;
  password: string;
}

export interface fetchUserResponseDto extends User {}
