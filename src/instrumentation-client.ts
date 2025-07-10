// 브라우저에서 발생하는 에러를 Sentry가 자동으로 수집할 수 있도록 연결
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN, // Sentry 프로젝트 연결 주소
  integrations: [
    Sentry.replayIntegration(), // 사용자 행동 기록
    Sentry.httpClientIntegration(), // API 요청 추적
    Sentry.browserTracingIntegration(), // 성능 추적
  ],
  sendDefaultPii: true, // 개인 식별 가능 정보 포함 여부
  tracesSampleRate: 1.0, // 모든 요청을 추적 (100%)
  debug: false, // 디버그 로그 출력 여부
  replaysSessionSampleRate: 0.1, // 오류 세션 중 10%만 녹화
  replaysOnErrorSampleRate: 1.0, // 에러 발생 세션 무조건 녹화
  release: process.env.RELEASE_VERSION, // 릴리즈 버전 정보
  enabled: process.env.NODE_ENV !== 'development', // 개발 환경에선 Sentry 비활성화

  beforeSend(event) {
    // is_custom_event 태그가 있는 경우에만 이벤트를 전송
    if (event.tags && event.tags.is_custom_event) {
      return event;
    }

    // is_custom_event 태그가 없으면 이벤트 전송하지 않음
    return null;
  },
});

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
