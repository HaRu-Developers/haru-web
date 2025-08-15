import * as Sentry from '@sentry/nextjs';

type ApiErrorType = 'server-error' | 'network-error' | 'unknown-error';
interface ApiErrorContext {
  url?: string;
  method?: string;
  status?: number;
  requestBody?: unknown;
  responseHeaders?: HeadersInit;
  responseBody?: unknown;
}

// API 에러 캡처 함수
export const captureApiError = (
  error: unknown,
  context?: ApiErrorContext,
  type: ApiErrorType = 'unknown-error',
) => {
  Sentry.withScope((scope) => {
    // 사용자 정의 태그를 추가하여 수집 대상을 분류
    scope.setTags({
      is_custom_event: 'true',
      type,
    });

    if (context) {
      scope.setContext('요청 정보', {
        url: context.url,
        status: context.status,
        requestBody: context.requestBody,
      });

      scope.setContext('응답 정보', {
        status: context.status,
        responseHeaders: context.responseHeaders,
        responseBody: context.responseBody,
      });
    }

    Sentry.captureException(error); // Sentry로 에러 전송
  });
};

// 렌더링 에러 캡처 함수
export const captureRenderError = (error: Error, context?: Record<string, unknown>) => {
  Sentry.withScope((scope) => {
    scope.setTags({
      is_custom_event: 'true',
      type: 'rendering-error',
    });

    if (context) {
      scope.setContext('렌더링 컨텍스트', context);
    }

    Sentry.captureException(error);
  });
};
