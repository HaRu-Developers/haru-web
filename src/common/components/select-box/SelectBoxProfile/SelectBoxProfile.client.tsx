'use client';

import { usePathname, useRouter } from 'next/navigation';

import useFetchUserDetail from '@api/user/get/queries/useFetchUserDetail';

import ModalPortal from '@common/components/ModalPortal/ModalPortal.client';
import ProfileImage from '@common/components/images/ProfileImage/ProfileImage.client';
import { ImageSize } from '@common/components/images/types/images.common.types';

import FooterButtons from './FooterButtons/FooterButtons.client';
import HeaderButtons from './HeaderButtons/HeaderButtons.client';
import MyWorkspaces from './MyWorkspaces/MyWorkspaces.server';
import NewWorkspaceButton from './NewWorkspaceButton/NewWorkspaceButton.client';

const SelectBoxProfile = ({
  isOpen,
  setIsOpen,
  onSettingClick,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onSettingClick?: () => void;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const { extra: userDetail, isFetching } = useFetchUserDetail({ enabled: isOpen });

  if (!isOpen) return null;

  const settingHref = `${pathname}/settings`;

  return (
    <ModalPortal>
      {/* 배경 영역 */}
      <div
        className="fixed inset-0 z-1"
        onClick={() => {
          setIsOpen(false);
        }}
      >
        {/* 드롭다운 모달 */}
        <div
          className="border-stroke-200 shadow-dropdown-popup w-302pxr top-112pxr left-16pxr fixed z-2 flex flex-col items-start gap-2.5 rounded-2xl border border-solid bg-white p-4"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col items-start gap-2.5 self-stretch">
            <div className="flex flex-col gap-4">
              {isFetching ? (
                <div className="h-40pxr w-190pxr animate-bg-pulse rounded-6pxr" />
              ) : (
                <div className="flex items-center gap-3.5">
                  <ProfileImage
                    userId={userDetail?.userId ?? ''}
                    src={userDetail?.imageUrl ?? null}
                    name={userDetail?.name ?? ''}
                    size={ImageSize.LARGE}
                  />
                  <div>
                    <p className="text-cap1-rg text-black">{userDetail?.name}</p>
                    <p className="text-cap2-rg text-gray-400">{userDetail?.email}</p>
                  </div>
                </div>
              )}
              <HeaderButtons
                onSettingClick={() => router.push(settingHref)}
                onAddMemberClick={() => router.push(settingHref)}
              />
            </div>

            <div className="bg-stroke-200 h-px w-full"></div>

            <div className="w-full">
              <p className="text-cap2-md mb-7pxr px-2.5 text-gray-400">내 워크스페이스</p>
              {/* 내 워크 스페이스 리스트 */}
              <MyWorkspaces />

              <NewWorkspaceButton />
            </div>
          </div>

          <div className="bg-stroke-200 h-1pxr w-full"></div>

          <FooterButtons />
        </div>
      </div>
    </ModalPortal>
  );
};

export default SelectBoxProfile;
