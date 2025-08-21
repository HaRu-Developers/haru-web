'use client';

import { useState } from 'react';

import ArrowIcons from '@icons/ArrowIcons/ArrowIcons';
import { ArrowIconsState } from '@icons/ArrowIcons/ArrowIcons.types';

import useFetchWorkspaceDetail from '@api/workspace/get/queries/useFetchWorkspaceDetail';

import { useWorkspaceActions, useWorkspaceInfo } from '@common/hooks/stores/useWorkspcaeStore';

import WorkspaceProfileImage from '@common/components/images/WorkspaceProfileImage/WorkspaceProfileImage.client';
import SelectBoxProfile from '@common/components/select-box/SelectBoxProfile/SelectBoxProfile.client';

import { WorkspaceProfileProps } from './WorkspaceProfile.types';
import WorkspaceProfileSkeleton from './WorkspaceProfileSkeleton.client';

const WorkSpaceProfile = ({ workspaceId }: WorkspaceProfileProps) => {
  const { isFetching, extra: workspaceDetail } = useFetchWorkspaceDetail(workspaceId ?? '');
  const { title, imageUrl } = useWorkspaceInfo();
  const { setTitle, setImageUrl, setMembers } = useWorkspaceActions();
  const [isOpenSelectBoxProfile, setIsOpenSelectBoxProfile] = useState(false);

  // workspaceId 존재 여부 + 데이터 유효성 체크 (제목 있는지로)
  const hasWorkspaceId = !!workspaceId;

  // 쿼리 데이터가 있으면 그걸 우선 표시, 없으면 스토어 표시
  const displayTitle = workspaceDetail?.title ?? title;
  const displayImageUrl = workspaceDetail?.imageUrl ?? imageUrl;
  // const hasValidWorkspace = !!displayTitle;

  const handleClick = () => {
    setIsOpenSelectBoxProfile((prev) => !prev);
  };

  // useEffect(() => {
  //   if (workspaceDetail && hasWorkspaceId) {
  //     setTitle(workspaceDetail.title);
  //     setImageUrl(workspaceDetail.imageUrl);
  //     setMembers(workspaceDetail.members);
  //   }
  // }, [workspaceDetail]);

  // TODO: workspace가 없더라도 프로필 모달은 열 수 있어야 함
  // if (!hasWorkspaceId) {
  //   return (
  //     <button className="h-46pxr px-7pxr py-5pxr mb-4pxr w-full cursor-not-allowed">
  //       <div className="flex items-center justify-between self-stretch">
  //         <div className="flex items-center gap-2">
  //           <WorkspaceProfileImage
  //             src={null}
  //             title={''}
  //             className="w-20pxr h-20pxr text-cap2-rg"
  //             border
  //           />
  //           <p className="text-cap1-rg text-black">워크스페이스 없음</p>
  //         </div>
  //         <ArrowIcons state={ArrowIconsState.DOWN} />
  //       </div>
  //     </button>
  //   );
  // }

  return (
    <div className="relative">
      {isFetching && <WorkspaceProfileSkeleton />}
      {!isFetching && (
        <>
          <button className="h-46pxr px-7pxr mb-4pxr py-5pxr w-full" onClick={handleClick}>
            <div className="flex items-center justify-between self-stretch">
              <div className="flex items-center gap-2">
                <WorkspaceProfileImage
                  src={displayImageUrl || null}
                  title={displayTitle}
                  className="w-20pxr h-20pxr text-cap2-rg"
                  border
                />
                {/*워크스페이스가 없는 경우에 대한 조건부 렌더링*/}
                {displayTitle ? (
                  <p className="text-t6-sb text-black">{displayTitle}</p>
                ) : (
                  <p className="text-cap1-rg text-black">워크스페이스 없음</p>
                )}
              </div>
              <ArrowIcons state={ArrowIconsState.DOWN} />
            </div>
          </button>
          {isOpenSelectBoxProfile && (
            <SelectBoxProfile
              isOpen={isOpenSelectBoxProfile}
              setIsOpen={setIsOpenSelectBoxProfile}
            />
          )}
        </>
      )}
    </div>
  );
};

export default WorkSpaceProfile;
