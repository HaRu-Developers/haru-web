// errors/guards.ts
import { API_ERROR_CODES } from '@common/constants/api-error-codes.constants';

import { ApiError } from './ApiError';

export type ApiErrorLike = {
  status?: number;
  code?: string;
};

export const isApiErrorLike = (e: unknown): e is ApiErrorLike =>
  !!e && typeof e === 'object' && ('status' in e || 'code' in e);

export const isApiError = (e: unknown): e is ApiError => e instanceof ApiError || isApiErrorLike(e);

/**
 * 권한 없는 사용자나, 없는 워크스페이스에 접근 못하게 하기 위한 가드
 */
export const isWorkspaceNotFound = (e: unknown): boolean =>
  isApiError(e) &&
  (e.status === 404 ||
    e.code === API_ERROR_CODES.USER_WORKSPACE.NOT_FOUND ||
    e.code === API_ERROR_CODES.WORKSPACE.NOT_FOUND);

export const isMeetingNotFound = (e: unknown): boolean =>
  isApiError(e) &&
  (e.status === 404 ||
    e.code === API_ERROR_CODES.MEETING.NOT_FOUND ||
    e.code === API_ERROR_CODES.MEETING.FILE_NOT_FOUND);
