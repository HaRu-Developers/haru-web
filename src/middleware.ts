import { type NextRequest, NextResponse } from 'next/server';

const getAccessToken = (req: NextRequest): string | null => {
  // Authorization: Bearer <token> 헤더에서
  const auth = req.headers.get('Authorization');
  if (auth && /^Bearer\s+/i.test(auth)) {
    return auth.replace(/^Bearer\s+/i, '').trim() || null;
  }

  console.log('[NEXT MIDDLEWARE] Bearer AUTH : ', auth);

  return null;
};

export const config = {
  matcher: [
    /*
     * 아래와 일치하는 경로를 제외한 모든 요청 경로에서 미들웨어를 실행합니다:
     * - api (API 라우트)
     * - _next/static (정적 파일)
     * - _next/image (이미지 최적화 파일)
     * - favicon.ico (파비콘 파일)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};

export function middleware(request: NextRequest) {
  // const { basePath, pathname, search } = request.nextUrl.clone(); // 절대 URL 유지를 위해 clone 후 수정
  // console.log(`[NEXT MIDDLEWARE] NEXT URL : ${basePath} | ${pathname} | ${search}`);
  //
  // const accessToken = getAccessToken(request);
  // const isProtectedPath = pathname.startsWith('/workspace');
  //
  // if (!accessToken && isProtectedPath) {
  //   // 워크스페이스 관련 경로에 접근하려는 비로그인 사용자는 로그인 페이지로 리다이렉트
  //   const url = request.nextUrl.clone();
  //   url.pathname = '/auth/login'; // 로그인 페이지로 리다이렉트
  //   // 이동 후 돌아올 경로와 쿼리 보존
  //   const returnTo = pathname + (search || '');
  //   url.search = `?redirect=${encodeURIComponent(returnTo)}`;
  //   return NextResponse.redirect(url);
  // }
  // const isAuthPage = AUTH_PAGES.has(pathname);
  // const isWorkspace = pathname === WORKSPACE_PREFIX || pathname.startsWith(WORKSPACE_PREFIX + '/');

  // 로그인 상태에서 로그인/회원가입 접근 금지
  // if (accessToken && isAuthPage) {
  //   // 사용자의 기본 진입점이 정해져 있다면 그곳으로
  //   url.pathname = WORKSPACE_PREFIX;
  //   url.search = '';
  //   return NextResponse.redirect(url);
  // }
  //
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
