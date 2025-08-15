'use client';

import Image from 'next/image';
import { useParams, usePathname, useRouter } from 'next/navigation';

import Image404 from '@assets/images/404/image.png';

import { RecentBoxedFile } from '@api/workspace/api.types';
import { useViewRecentDocumentsQuery } from '@api/workspace/get/queries/useViewRecentBoxedFiles';

import { FileType } from '@common/types/file-type.enum';
import { GnbSection } from '@common/types/gnbs.types';

import { ROUTES } from '@common/constants/routes.constants';

import CreateWorkspaceButton from '@common/components/buttons/38px/CreateWorkspaceButton/CreateWorkSpaceButton.client';
import ImageCta from '@common/components/cta/ImageCta/ImageCta.client';
import ImageCtaSkeleton from '@common/components/cta/ImageCta/ImageCtaSkeleton';
import BoxedFile from '@common/components/etc/BoxedFile/BoxedFile.client';
import BoxedFileSkeleton from '@common/components/etc/BoxedFile/BoxedFileSkelton';
import CalendarSection from '@common/components/etc/calendar/CalendarSection/CalendarSection.client';
import GnbTop from '@common/components/gnbs/GnbTop/GnbTop.client';

import HasNoWorkspace from '@features/team-mood-tracker/components/workspace-main/HasNoWorkspace/HasNoWorkspace.server';

const MainWithWorkspacePage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { workspaceId } = useParams<{ workspaceId?: string }>();

  const hasworkSpace = !!workspaceId;

  const { data: recentData, isFetching: isRecentLoading } = useViewRecentDocumentsQuery(
    workspaceId ?? '',
  );

  const recentDocuments = recentData?.documents ?? [];
  const validRecentDocuments = recentDocuments.filter((file) => file.lastOpened);

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

  const handleFileClick = (file: RecentBoxedFile) => {
    if (!workspaceId) return;

    // 상수 맵에서 문서 타입에 맞는 경로 생성 함수를 찾습니다.
    const pathGenerator = ROUTES.DETAIL_DOCUMENTS_DEFAULT[file.documentType];

    if (pathGenerator) {
      const path = pathGenerator(workspaceId, file.documentId);
      router.push(path);
    } else {
      console.error('알 수 없는 문서 타입입니다:', file.documentType);
    }
  };

  return (
    <div>
      <GnbTop section={GnbSection.MAIN} />

      {hasworkSpace ? (
        <div className="flex flex-col items-center">
          <div className="mb-74pxr flex flex-col">
            <div className="mt-36pxr mb-16pxr text-t3-bd">새로 시작하기</div>
            <div className="gap-20pxr md:gap-18pxr flex">
              {isRecentLoading
                ? Array.from({ length: ctaItems.length }).map((_, index) => (
                    <ImageCtaSkeleton key={index} />
                  ))
                : ctaItems.map((item, index) => (
                    <ImageCta key={index} type={item.type} onClick={item.onClick} />
                  ))}
            </div>
          </div>

          <div className="flex flex-col justify-start">
            <div className="mb-16pxr text-t3-bd w-1030pxr">최근 항목</div>
            <div className="gap-18pxr md:gap-16pxr min-h-400pxr grid grid-cols-4">
              {isRecentLoading ? (
                Array.from({ length: 8 }).map((_, index) => <BoxedFileSkeleton key={index} />)
              ) : validRecentDocuments.length > 0 ? (
                validRecentDocuments.map((file) => (
                  <BoxedFile
                    key={file.documentId}
                    title={file.title}
                    lastOpened={file.lastOpened}
                    documentType={file.documentType}
                    thumbnailUrl={file.thumbnailUrl ?? ''}
                    onClick={() => handleFileClick(file)}
                  />
                ))
              ) : (
                <div className="text-t5-sb text-gray-300">{`최근 항목이 없습니다.`}</div>
              )}
            </div>
          </div>

          <div className="mt-74pxr mb-92pxr flex flex-col">
            <div className="mb-20pxr text-t3-bd">내 캘린더</div>
            <div>
              <CalendarSection workspaceId={Number(workspaceId)} />
            </div>
          </div>
        </div>
      ) : (
        <HasNoWorkspace />
      )}
    </div>
  );
};

export default MainWithWorkspacePage;
