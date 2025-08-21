// signup
export interface SignupRequestDto {
  email: string;
  password: string;
  name: string;
  marketingAgreed: boolean;
}
// signup response는 빈 객체임

// email duplication check
export interface CheckEmailDuplicationRequestDto {
  email: string;
}

export interface CheckEmailDuplicationResponseDto {
  emailStatus: 'AVAILABLE' | 'UNAVAILABLE';
}

// refresh token
/**
 * Refresh Token 요청 DTO
 *
 * Header에 들어가는 값 입니다.
 * @deprecated custom fetcher의 구현에 따라 달라집니다.
 */
export interface RefreshAccessTokenRequestDto {
  refreshToken: string;
}

export interface RefreshAccessTokenResponseDto {
  userId: string;
  accessToken: string;
  refreshToken: string;
}

// login
export interface LoginRequestDto {
  email: string;
  password: string;
}

export interface LoginResponseDto {
  userid: string;
  accessToken: string;
  refreshToken: string;
}

// user info
export interface PatchUserInfoRequestDto {
  name?: string;
  password?: string;
}

export interface UserInfoResponseDto {
  id: string;
  email: string;
  imageUrl: string | null;
  name: string;
}

// search user
export interface SearchUserRequestDto {
  email: string;
}

/**
 * Search User 응답 DTO
 *
 * Response는 해당 DTO의 배열을 반환합니다.
 *
 * Generic에 배열로 전달하세요.
 */
export interface SearchUserResponseDto {
  id: string;
  email: string;
  imageUrl: string | null;
  name: string;
}

// logout

/**
 * @deprecated custom fetcher의 구현에 따라 달라집니다.
 */
export interface LogoutRequestDto {
  accessToken: string;
}

// signupAndLogin
/**
 * @deprecated 초대 받은 사용자는 query string의 token 도 함께 넘겨줍니다.
 */
export interface SignupAndLoginRequestDto {
  email: string;
  password: string;
  name: string;
  marketingAgreed: boolean;
  token?: string;
}
