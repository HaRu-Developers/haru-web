import type { NextConfig } from 'next';

import { withSentryConfig } from '@sentry/nextjs';

const nextConfig: NextConfig = {
  /* config options here */
};

export default withSentryConfig(nextConfig, {
  org: 'haru-team',
  project: 'haru',
  // sourcemap 업로드나 설정 로깅을 CI 환경에서만 출력
  silent: !process.env.CI,
  // 더 많은 클라이언트 파일을 소스맵 업로드 대상으로 포함해 자세한 정보 얻음
  widenClientFileUpload: true,
  // Sentry에 에러 전송을 직접 하지 않고, Next.js 서버를 통해 프록시해서 보내게
  tunnelRoute: '/monitoring',
  // 배포시 로깅 함수 제거
  disableLogger: true,
});
