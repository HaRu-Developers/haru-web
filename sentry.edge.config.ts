//Next.js Edge 환경에서 Sentry를 초기화하는 설정 파일
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 1.0,
  debug: false,
  release: process.env.RELEASE_VERSION,
  enabled: process.env.NODE_ENV !== 'development',
});
