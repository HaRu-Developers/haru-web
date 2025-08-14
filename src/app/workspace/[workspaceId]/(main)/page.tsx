'use client';

import { useState } from 'react';

import Image from 'next/image';
import { useParams, usePathname, useRouter } from 'next/navigation';

import Image404 from '@assets/images/404/image.png';

import { FileType } from '@common/types/file-type.enum';
import { GnbSection } from '@common/types/gnbs.types';

import CreateWorkspaceButton from '@common/components/buttons/38px/CreateWorkspaceButton/CreateWorkSpaceButton.client';
import ImageCta from '@common/components/cta/ImageCta/ImageCta.client';
import ImageCtaSkeleton from '@common/components/cta/ImageCta/ImageCtaSkeleton';
import BoxedFile from '@common/components/etc/BoxedFile/BoxedFile.client';
import BoxedFileSkeleton from '@common/components/etc/BoxedFile/BoxedFileSkelton';
import GnbTop from '@common/components/gnbs/GnbTop/GnbTop.client';

import { dummyFiles } from '@features/on-boarding/mocks/dummy-files';

const MainWithWorkspacePage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { workspaceId } = useParams<{ workspaceId?: string }>();

  // 임시 로딩 상태 (실제 프로젝트에서는 API fetch 기준으로 변경)
  const [isLoading, setIsLoading] = useState(false);
  const hasworkSpace = !!workspaceId;

  const ctaItems = [
    {
      type: FileType.AI_MEETING_MANAGER,
      onClick: () => router.push(`${pathname}/ai-meeting-manager`),
    },
    {
      type: FileType.SNS_EVENT_ASSISTANT,
      onClick: () => router.push(`${pathname}/sns-event-assistant`),
    },
    {
      type: FileType.TEAM_MOOD_TRACKER,
      onClick: () => router.push(`${pathname}/team-mood-tracker`),
    },
  ];

  return (
    <div>
      <GnbTop section={GnbSection.MAIN} />

      {hasworkSpace ? (
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
      ) : (
        <div className="flex flex-col items-center">
          <div className="mb-292pxr flex flex-col">
            <div className="mt-36pxr text-t3-bd mb-16pxr">새로 시작하기</div>
            <div className="w-1030pxr h-534pxr border-stroke-200 rounded-16pxr flex flex-col items-center border border-solid">
              <div className="w-396pxr h-266pxr mt-30pxr mb-36pxr">
                <Image src={Image404} alt="워크스페이스 없음" />
              </div>
              <div className="text-t3-sb mb-8pxr">아직 소속된 워크스페이스가 없어요!</div>
              <div className="mb-18pxr text-b2-rg text-center whitespace-pre-line text-gray-200">{`워크스페이스에 참여하고\n회의 진행, 이벤트 운영, 팀 분위기 설문 등\nHaRu의 다양한 기능을 이용해 보세요!`}</div>
              <CreateWorkspaceButton onClick={() => console.log()} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainWithWorkspacePage;
