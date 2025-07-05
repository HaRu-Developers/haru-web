import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

import { captureApiError } from './sentry';

interface ImproveFetchOptionsAxiosRequestConfig extends AxiosRequestConfig {
  fetchOptions?: RequestInit; // fetch 전용 설정 받음
}

const createAxiosInstance = (config?: ImproveFetchOptionsAxiosRequestConfig): AxiosInstance => {
  const baseURL =
    typeof window === 'undefined'
      ? process.env.SERVER_API_BASE_URL // 외부 API 호출
      : `${window.location.origin}/api`; // Next.js의 API Routes 호출

  const instance = axios.create({
    adapter: 'fetch',
    timeout: 1000 * 60,
    baseURL,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    ...config, // 전달된 config로 override
  });

  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status >= 500) {
        captureApiError(error);
      }
      return Promise.reject(error);
    },
  );

  return instance;
};

// 기본 인스턴스
export const defaultApi = createAxiosInstance();
