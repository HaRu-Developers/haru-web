'use client';

import { useState } from 'react';

import { defaultApi } from '@lib/fetcher';

const TestPage = () => {
  const [error, setError] = useState<Error | null>(null);

  if (error) {
    // 이 throw는 렌더링 중 발생 → error.tsx가 잡음
    throw error;
  }

  const triggerApiError = async () => {
    try {
      await defaultApi('/api/blabla', {
        method: 'GET',
      });
    } catch (e) {
      if (e instanceof Error) {
        setError(e); // 렌더링 흐름에 반영
      }
    }
  };

  const triggerRenderError = async () => {
    setError(new Error('렌더링 중 에러 발생')); // 렌더링 흐름에 반영
  };

  return (
    <div className="space-y-4 p-8">
      <button
        className="text-bt3-md bg-system-red rounded px-4 py-2 text-white"
        onClick={triggerApiError}
      >
        API 에러 전송 테스트
      </button>

      <button
        className="text-bt3-md rounded bg-blue-500 px-4 py-2 text-white"
        onClick={triggerRenderError}
      >
        렌더링 에러 전송 테스트
      </button>
    </div>
  );
};

export default TestPage;
