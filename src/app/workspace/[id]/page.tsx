'use client';

import { useState } from 'react';

import ImageCta from '@common/components/cta/ImageCta/ImageCta.client';
import ImageCtaSkeleton from '@common/components/cta/ImageCta/ImageCtaSkeleton';
import BoxedFile from '@common/components/etc/BoxedFile/BoxedFile.client';
import BoxedFileSkeleton from '@common/components/etc/BoxedFile/BoxedFileSkelton';

import { ctaItems, dummyFiles } from '@features/on-boarding/mocks/dummy-files';

const WorkSpaceMainPage = () => {
  // 임시 로딩 상태 (실제 프로젝트에서는 API fetch 기준으로 변경)
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="flex flex-col items-center">
      <div className="mb-74pxr flex flex-col">
        <div className="mt-36pxr mb-16pxr text-t3-bd">새로 시작하기</div>
        <div className="gap-20pxr md:gap-18pxr flex">
          {isLoading
            ? Array.from({ length: ctaItems.length }).map((_, index) => (
                <ImageCtaSkeleton key={index} />
              ))
            : ctaItems.map((item, index) => (
                <ImageCta key={index} type={item.type} onClick={item.onClick} />
              ))}
        </div>
      </div>

      <div className="flex flex-col">
        <div className="mb-16pxr text-t3-bd">최근 항목</div>
        <div className="gap-18pxr md:gap-16pxr grid grid-cols-4">
          {isLoading
            ? Array.from({ length: 8 }).map((_, index) => <BoxedFileSkeleton key={index} />)
            : dummyFiles.map((file, idx) => (
                <BoxedFile
                  key={file.title + idx}
                  title={file.title}
                  lastOpened={file.lastOpened}
                  documentType={file.documentType}
                  thumbnailUrl={file.thumbnailUrl}
                  onClick={() => {}}
                />
              ))}
        </div>
      </div>

      <div className="mt-74pxr mb-92pxr flex flex-col">
        <div className="mb-16pxr text-t3-bd">내 캘린더</div>
        <div>수현이 캘린더 구현 후 그대로 대체 예정</div>
      </div>
    </div>
  );
};

export default WorkSpaceMainPage;
