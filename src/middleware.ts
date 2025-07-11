import { NextRequest, NextResponse } from 'next/server';

export const middleware = (req: NextRequest) => {
  const url = req.nextUrl;

  // Sentry tunnel 우회 경로 제외
  if (url.pathname.startsWith('/monitoring')) {
    return NextResponse.next();
  }

  // 그 외 미들웨어 로직
  return NextResponse.next();
};

// 미들웨어 적용 경로
export const config = {
  matcher: [],
};
