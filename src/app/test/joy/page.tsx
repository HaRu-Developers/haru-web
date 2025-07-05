'use client';

import { useState } from 'react';

import { defaultApi } from '@lib/axios';

const TestPage = () => {
  const [crash, setCrash] = useState(false);

  const triggerApiError = async () => {
    try {
      await defaultApi.get('/blabla');
    } catch (_error) {
      setCrash(true);
    }
  };

  const triggerRenderError = () => {
    setCrash(true);
  };

  if (crash) {
    throw new Error('에러 발생 테스트');
  }

  return (
    <div className="space-y-4 p-8">
      <p className="text-headline-1 text-system-red">줄바꿈이 자연스러운 한국어 문단</p>

      <button
        className="text-button-1 bg-gradient-primary rounded px-4 py-2 text-white"
        onClick={triggerApiError}
      >
        API 에러 전송 테스트
      </button>

      <button
        className="text-button-1 rounded bg-blue-500 px-4 py-2 text-white"
        onClick={triggerRenderError}
      >
        렌더링 에러 전송 테스트
      </button>
    </div>
  );
};

export default TestPage;
