'use client';

import { useEffect } from 'react';

import { captureRenderError } from '@lib/sentry';

const Error = ({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) => {
  useEffect(() => {
    captureRenderError(error, {
      hint: error.digest ?? 'no-digest',
    });
  }, [error]);

  return (
    <>
      <h2>예상치 못한 오류가 발생했습니다.</h2>
      <button onClick={reset}>다시 시도하기</button>
    </>
  );
};

export default Error;
