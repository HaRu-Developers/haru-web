'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import ArrowIcons from '@icons/ArrowIcons/ArrowIcons';
import { ArrowIconsState } from '@icons/ArrowIcons/ArrowIcons.types';

import useFetchWorkspaceDetail from '@api/workspace/get/queries/useFetchWorkspaceDetail';

import WorkspaceProfileImage from '@common/components/images/WorkspaceProfileImage/WorkspaceProfileImage.client';
import SelectBoxProfile from '@common/components/select-box/SelectBoxProfile/SelectBoxProfile.client';

import { WorkspaceProfileProps } from './WorkspaceProfile.types';
import WorkspaceProfileSkeleton from './WorkspaceProfileSkeleton.client';

const WorkSpaceProfile = ({ workspaceId }: WorkspaceProfileProps) => {
  const router = useRouter();
  const { isFetching, extra: workspaceDetail } = useFetchWorkspaceDetail(workspaceId || '');
  const [isOpenSelectBoxProfile, setIsOpenSelectBoxProfile] = useState(false);

  const title = workspaceDetail?.title;
  const imageUrl = workspaceDetail?.imageUrl;

  // workspaceId 존재 여부 + 데이터 유효성 체크 (제목 있는지로)
  const hasWorkspaceId = !!workspaceId;
  const hasValidWorkspace = !!title;

  const handleClick = () => {
    setIsOpenSelectBoxProfile((prev) => !prev);
  };

  // TODO: ROUTES로 변경 처리 필요
  const handleSettingClick = () => {
    if (hasWorkspaceId) {
      router.push(`/workspace/${workspaceId}/settings`);
    } else {
      router.push(`/workspace/settings`);
    }
  };

  if (!hasWorkspaceId) {
    return (
      <button className="h-46pxr px-7pxr py-5pxr mb-4pxr w-full cursor-not-allowed">
        <div className="flex items-center justify-between self-stretch">
          <div className="flex items-center gap-2">
            <WorkspaceProfileImage
              src={null}
              title={''}
              className="w-20pxr h-20pxr text-cap2-rg"
              border
            />
            <p className="text-cap1-rg text-black">워크스페이스 없음</p>
          </div>
          <ArrowIcons state={ArrowIconsState.DOWN} />
        </div>
      </button>
    );
  }

  return (
    <div className="relative">
      {isFetching && <WorkspaceProfileSkeleton />}
      {!isFetching && hasValidWorkspace && (
        <>
          <button className="h-46pxr px-7pxr mb-4pxr py-5pxr w-full" onClick={handleClick}>
            <div className="flex items-center justify-between self-stretch">
              <div className="flex items-center gap-2">
                <WorkspaceProfileImage
                  src={imageUrl || null}
                  title={title}
                  className="w-20pxr h-20pxr text-cap2-rg"
                  border
                />
                <p className="text-t6-sb text-black">{title}</p>
              </div>
              <ArrowIcons state={ArrowIconsState.DOWN} />
            </div>
          </button>
          {isOpenSelectBoxProfile && (
            <SelectBoxProfile
              isOpen={isOpenSelectBoxProfile}
              setIsOpen={setIsOpenSelectBoxProfile}
              onSettingClick={handleSettingClick}
            />
          )}
        </>
      )}
    </div>
  );
};

export default WorkSpaceProfile;
