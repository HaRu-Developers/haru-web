import * as Sentry from '@sentry/nextjs';
import { AxiosError } from 'axios';

// API 에러 캡처 함수
export const captureApiError = (axiosError: AxiosError) => {
	const {
		method,
		url,
		params,
		data: requestData,
		headers: requestHeaders,
	} = axiosError.config ?? {};
	const {
		status,
		statusText,
		data: responseData,
		headers: responseHeaders,
	} = axiosError.response ?? {};

	Sentry.withScope((scope) => {
		// 사용자 정의 태그를 추가하여 수집 대상을 분류
		scope.setTags({
			is_custom_event: true,
		});

		scope.setContext('요청', {
			method,
			url,
			params,
			requestData,
			requestHeaders,
		});
		scope.setContext('응답', {
			status,
			statusText,
			responseData,
			responseHeaders,
		});

		Sentry.captureException(axiosError); // Sentry로 에러 전송
	});
};

// 렌더링 에러 캡처 함수
export const captureRenderError = (error: Error, context?: Record<string, unknown>) => {
	Sentry.withScope((scope) => {
		scope.setTag('is_custom_event', 'true');

		if (context) {
			scope.setContext('렌더링 컨텍스트', context);
		}

		Sentry.captureException(error);
	});
};
