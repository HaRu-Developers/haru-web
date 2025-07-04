'use client';

import { useState } from 'react';

import LoadingBar from '@common/components/LoadingBar/LoadingBar';
import ProgressBar from '@common/components/ProgressBar/ProgressBar';

const TestPage = () => {
  const [progress, setProgress] = useState(0);

  const startDownload = () => {
    console.log('start download');
    setProgress(0);
    let value = 0;
    const interval = setInterval(() => {
      value += 5;
      setProgress(value);
      if (value >= 100) {
        clearInterval(interval);
      }
    }, 300); // 300ms마다 5% 증가 (약 6초간)
  };

  return (
    <div className="space-y-4 p-8">
      <p className="text-headline-1 text-system-red">줄바꿈이 자연스러운 한국어 문단</p>
      <button className="text-button-1 bg-gradient-primary rounded px-4 py-2 text-white">
        버튼 스타일 테스트
      </button>
      <button
        className="text-button-1 rounded bg-gray-100 px-4 py-2 text-white"
        onClick={() => startDownload()}
      >
        다운로드 시작
      </button>
      <LoadingBar />
      <ProgressBar progress={progress} />
    </div>
  );
};

export default TestPage;
