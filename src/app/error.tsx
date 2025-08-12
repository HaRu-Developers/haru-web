'use client';

import { useEffect } from 'react';

import Image from 'next/image';

import errorImage from '@assets/images/404/image.png';

import { captureRenderError } from '@lib/sentry';

import CustomButton from '@buttons/38px/CustomButton/CustomButton.client';

const Error = ({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) => {
  useEffect(() => {
    captureRenderError(error, {
      hint: error.digest ?? 'no-digest',
    });
  }, [error]);

  return (
    <main className="flex min-h-screen items-center justify-center">
      <section className="gap-74pxr flex shrink-0 items-center">
        <div className="w-658pxr h-440pxr relative">
          <Image src={errorImage} alt="에러 이미지" fill />
        </div>
        <div>
          <h2 className="mb-14pxr text-primary h-52pr text-h4-bd">일시적인 오류가 발생했어요.</h2>
          <p className="mb-42pxr text-b1-rg text-gray-200">잠시 후 다시 시도해 주세요.</p>
          <CustomButton onClick={reset}>새로 고침</CustomButton>
        </div>
      </section>
    </main>
  );
};

export default Error;
