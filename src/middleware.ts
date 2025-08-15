import { type NextRequest, NextResponse } from 'next/server';

import { ROUTES } from '@common/constants/routes.constants';

// 라우트 상수는 미들웨어 안에서 문자열로 두는 게 안전 (정적 분석 대상)
const ROOT = '/';
const LANDING = '/landing';
const AUTH_LOGIN = '/auth/login';
const AUTH_REGISTER = '/auth/register';
const WORKSPACE_PREFIX = '/workspace';
const AUTH_PAGES = new Set([AUTH_LOGIN, AUTH_REGISTER]);

function getAccessToken(req: NextRequest): string | null {
  // Authorization: Bearer <token> 헤더에서
  const auth = req.headers.get('authorization');
  if (auth && /^Bearer\s+/i.test(auth)) {
    return auth.replace(/^Bearer\s+/i, '').trim() || null;
  }

  console.log(auth);

  return null;
}

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone(); // 절대 URL 유지를 위해 clone 후 수정
  const { pathname, search } = url;

  // const accessToken = getAccessToken(request);
  // const isAuthPage = AUTH_PAGES.has(pathname);
  // const isWorkspace = pathname === WORKSPACE_PREFIX || pathname.startsWith(WORKSPACE_PREFIX + '/');

  // 루트로 접근 → 랜딩으로
  // if (pathname === ROOT) {
  //   url.pathname = LANDING;
  //   return NextResponse.redirect(url);
  // }

  // // 로그인 상태에서 로그인/회원가입 접근 금지
  // if (accessToken && isAuthPage) {
  //   // 사용자의 기본 진입점이 정해져 있다면 그곳으로
  //   url.pathname = WORKSPACE_PREFIX;
  //   url.search = '';
  //   return NextResponse.redirect(url);
  // }

  // // 비로그인 상태에서 워크스페이스 접근 금지 → 로그인으로
  // if (!accessToken && isWorkspace) {
  //   url.pathname = AUTH_LOGIN;
  //   // 이동 후 돌아올 경로와 쿼리 보존
  //   const returnTo = pathname + (search || '');
  //   url.search = `?returnTo=${encodeURIComponent(returnTo)}`;
  //   return NextResponse.redirect(url);
  // }

  // 나머지는 통과
  return NextResponse.next();
}

// 미들웨어 적용 경로
export const config = {
  matcher: ['/', '/auth/login', '/auth/register', '/workspace/:path*'],
};
