import { ApiError } from '@common/errors/ApiError';

type Meta = Record<string, unknown>;

export const extractApiError = (err: unknown) => {
  const e = err as ApiError;
  return {
    status: e?.status ?? 0,
    code: e?.code ?? e?.body?.code ?? 'UNKNOWN',
    message: e?.message ?? e?.body?.message ?? 'Unknown error',
    body: e?.body,
    url: e?.url,
    method: e?.method,
  };
};

export const logApiError = (err: unknown, meta?: Meta) => {
  const data = extractApiError(err);
  console.error('[API ERROR]', { ...data, ...meta });
};
