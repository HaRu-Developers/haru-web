import axios from 'axios';

import { captureApiError } from './sentry';

const isServer = typeof window === 'undefined';
const baseURL = isServer
	? process.env.SERVER_API_BASE_URL // 외부 API 호출
	: `${window.location.origin}/api`; // Next.js의 API Routes 호출

// Next.js의 서버 컴포넌트, middleware, edge functions 등에서도 axios 스타일로 fetch 사용할 수 있게
export const axiosInstance = axios.create({
	adapter: 'fetch',
	fetchOptions: { cache: 'no-store' }, // 캐시 사용 x, 매번 새로운 요청
	baseURL,
	headers: {
		'Content-Type': 'application/json',
		Accept: 'application/json',
	},
	timeout: 10000,
});

// 응답 인터셉터
axiosInstance.interceptors.response.use(
	(response) => {
		// 2xx 응답은 그대로 반환
		return response;
	},
	(error) => {
		if (error.response && error.response.status >= 500 && error.response.status < 600) {
			// 5xx 에러만 Sentry로 전송
			captureApiError(error); // captureApiError 함수로 처리
		}
		return Promise.reject(error);
	},
);
