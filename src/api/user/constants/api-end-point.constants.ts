export const AUTH_API_ENDPOINTS = {
  SIGN_UP: '/users/signup',
  CHECK_EMAIL_DUPLICATION: '/users/signup/same',
  REFRESH_TOKEN: '/users/refresh',
  LOGIN: '/users/login',
  USER_INFO: '/users/info',
  SEARCH_USER: '/users/search',
  LOGOUT: '/users/logout',
} as const;
