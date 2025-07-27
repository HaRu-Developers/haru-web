'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import notFoundImage from '@assets/images/404/mixed.png';

import CustomButton from '@buttons/38px/CustomButton/CustomButton.client';

const NotFound = () => {
  const router = useRouter();

  return (
    <main className="flex min-h-screen items-center justify-center">
      <section className="gap-74pxr flex shrink-0 items-center">
        <div className="w-658pxr h-440pxr relative">
          <Image src={notFoundImage} alt="404 이미지" fill />
        </div>
        <div>
          <h2 className="mb-14pxr text-primary h-52pr text-40pxr self-stretch leading-[130%] font-bold tracking-[-0.8px] not-italic">
            404 ERROR
          </h2>
          <p className="mb-42pxr text-b1-rg text-gray-200">
            죄송합니다. 페이지를 찾을 수 없습니다. <br />
            존재하지 않는 주소를 입력하셨거나, <br />
            요청하신 페이지의 주소가 변경, 삭제되어 찾을 수 없습니다.
          </p>
          <CustomButton onClick={() => router.back()}>이전으로 이동</CustomButton>
        </div>
      </section>
    </main>
  );
};

export default NotFound;
