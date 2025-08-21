'use client';

import { useCallback, useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import { useInviteMembersMutation } from '@api/on-boarding/post/mutations/useInviteMemberMutation';
import useInstagram from '@api/sns-event-assistant/get/queries/useInstagram';
import useFetchWorkspaceDetail from '@api/workspace/get/queries/useFetchWorkspaceDetail';
import useEditWorkspaceDetail from '@api/workspace/patch/mutations/useEditWorkspaceDetail';

import { ToastType } from '@common/types/toast.types';

import { ROUTES } from '@common/constants/routes.constants';

import { useToastActions } from '@common/hooks/stores/useToastStore';
import { useWorkspaceIdActions } from '@common/hooks/stores/useWorkspaceIdStore';
import { useWorkspaceActions, useWorkspaceInfo } from '@common/hooks/stores/useWorkspcaeStore';

import ChangableWorkspaceImage from '@common/components/ChangableWorkspaceImage/ChangableWorkspaceImage.client';
import AddWorkspaceButton from '@common/components/buttons/30px/AddWorkspaceButton/AddWorkspaceButton.client';
import SocialConnectButton from '@common/components/buttons/30px/SocialConnectButton/SocialConnectButton.client';
import SaveButton from '@common/components/buttons/38px/SaveButton/SaveButton.client';
import InputInviteMember from '@common/components/inputs/input-invite-member/InputInviteMember/InputInviteMember.client';

import CommonText from '../../CommonText/CommonText.client';
import { CommonTextType } from '../../CommonText/CommonText.types';
import TeammateCard from '../TeammateCard/TeammateCard.client';
import { WorkspaceSettingsMenuProps } from './WorkspaceSettingsMenu.types';

/**
 * 설정 - 워크스페이스 세팅 설정
 */
const WorkspaceSettingsMenu = ({ workspaceId }: WorkspaceSettingsMenuProps) => {
  // 내부적으로 처리 되서 반환 됩니다.
  const router = useRouter();
  const [value, setValue] = useState<string>('');
  const [emails, setEmails] = useState<string[]>([]);
  const [image, setImage] = useState<File>(); // 워크스페이스 프로필 이미지 변경 시 사용
  const { extra: workspaceExtra } = useFetchWorkspaceDetail(workspaceId); // 워크스페이스 정보 가져오기
  const { setWorkspaceId } = useWorkspaceIdActions();
  const { title: workspaceTitle, imageUrl, members } = useWorkspaceInfo();
  const { mutate: editWorkspaceDetail } = useEditWorkspaceDetail(workspaceId);
  const [title, setTitle] = useState<string>(workspaceExtra?.title ?? workspaceTitle); // 워크스페이스 수정하고 바로 반영하지 않기 위해 사용
  const { setTitle: setWorkspaceTitle, setImageUrl, setMembers } = useWorkspaceActions();
  const { extra: instagram } = useInstagram(workspaceId);
  const { addToast } = useToastActions();
  const { mutate: inviteMembers } = useInviteMembersMutation();

  const handleAddWorkspace = () => {
    router.push(ROUTES.ONBOARDING);
  };

  const handleSave = useCallback(() => {
    // 서버에 프로필 수정 요청 api
    editWorkspaceDetail(
      { title, image, workspaceId },
      {
        onSuccess: (data) => {
          setImageUrl(data.result.imageUrl);
          setWorkspaceTitle(data.result.title);
          addToast({
            text: `워크스페이스가 성공적으로 수정되었습니다.`,
            type: [ToastType.SUCCESS][Date.now() % 3],
            duration: 2000,
          });
        },
        onError: (error) => {
          addToast({
            text: `워크스페이스 수정에 실패했습니다: ${error.message}`,
            type: [ToastType.ERROR][Date.now() % 3],
            duration: 2000,
          });
        },
      },
    );
  }, [editWorkspaceDetail, title, image]);

  const handleConnectInstagram = () => {
    // 1. .env.local 파일에서 클라이언트 ID 가져오기
    const clientId = process.env.NEXT_PUBLIC_INSTAGRAM_CLIENT_ID;

    // 2. 리디렉션 URI /가 두개 들어갈까봐 일단 바꿔봄
    const redirectUri = `${window.location.origin}/workspace/instagram-callback`;

    // 3. 인스타그램에 요청할 권한 범위 설정
    const scope =
      'instagram_business_basic,instagram_business_manage_messages,instagram_business_manage_comments,instagram_business_content_publish,instagram_business_manage_insights';

    // 4. 최종 인증 URL 생성
    const authUrl = `https://www.instagram.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}&force_reauth=true`;

    // 5. 생성된 URL로 사용자를 이동시킴
    window.location.href = authUrl;
  };

  const handleValueChange = (value: string) => {
    // 입력 되는 값 반환 합니다.
    setValue(value);
  };
  const handleEmailChange = (emails: string[]) => {
    // 이메일 목록 변경 될 때 마다 호출 됩니다. -> 제거, 추가, 변경 모두 포함
    // 이메일 양식 안 지키면 추가 안됩니다.
    setEmails(emails);
  };
  const handleRemoveEmail = (email: string) => {
    // 이메일 자동으로 제거 됩니다 -> 제거 된 이메일만 반환, 변경된 사항은 handleEmailChange로 반환
    console.log('이메일 제거:', email);
  };
  const handleInvite = (emails: string[]) => {
    // 초대 버튼 클릭 시 호출 됩니다. -> 이메일 목록 반환
    // 이메일 목록은 여기서 반환되고 기존 이메일 목록은 제거됩니다.
    if (!workspaceId) {
      return;
    }

    inviteMembers(
      {
        workspaceId,
        emails,
      },
      {
        onSuccess: () => {
          addToast({
            text: '팀원이 성공적으로 초대되었습니다.',
            type: ToastType.SUCCESS,
            duration: 2000,
          });
        },
        onError: () => {
          addToast({
            text: '팀원 초대에 실패했습니다.',
            type: ToastType.ERROR,
            duration: 2000,
          });
        },
      },
    );
  };
  const handleClickWorkspaceImage = () => {
    console.log('워크스페이스 프로필 이미지 클릭');
  };

  useEffect(() => {
    if (workspaceId) {
      setWorkspaceId(workspaceId);
      console.log('워크스페이스 ID가 변경되었습니다:', workspaceId);
    }
  }, [workspaceId, setWorkspaceId]);

  useEffect(() => {
    if (workspaceExtra) {
      setTitle(workspaceExtra.title);
      setImageUrl(workspaceExtra.imageUrl);
      setMembers(workspaceExtra.members || []);
    }
  }, [workspaceExtra, setImageUrl, setMembers]);
  return (
    <div className="px-35pxr py-24pxr scrollbar-component gap-y-24pxr flex h-full w-full flex-col overflow-y-auto">
      <CommonText type={CommonTextType.T4_BD_BLACK} text="워크스페이스 기본 정보" />
      {/* 워크스페이스 정보 섹션 */}
      <div className="gap-y-12pxr flex flex-col">
        <CommonText type={CommonTextType.T5_SB_BLACK} text="워크스페이스 정보" />
        {/* 워크스페이스 정보 섹션 - 워크스페이스 대표 사진*/}

        <div className="gap-y-8pxr flex flex-col">
          <CommonText type={CommonTextType.CAP1_RG_GRAY_300} text="워크스페이스 대표 사진" />
          <ChangableWorkspaceImage
            title={title}
            initialPreview={workspaceExtra?.imageUrl ?? imageUrl}
            onFileChange={(file) => setImage(file)}
          />
        </div>

        {/* 워크스페이스 정보 섹션 - 워크스페이스 명*/}
        <div className="gap-y-8pxr flex flex-col">
          <CommonText type={CommonTextType.CAP1_RG_GRAY_300} text="워크스페이스 명" />
          <input
            type="text"
            value={title ?? 'No Workspace Name'}
            className="py-7pxr px-10pxr text-b3-rg rounded-4pxr border-stroke-200 border text-black"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
      </div>
      {/* 워크스페이스 추가 섹션 */}
      <div className="gap-y-12pxr flex w-full flex-col">
        <CommonText type={CommonTextType.T5_SB_BLACK} text="워크스페이스 추가" />
        <AddWorkspaceButton onClick={handleAddWorkspace} />
      </div>

      {/* 구분선 */}
      <hr className="border-stroke-200 w-full" />

      {/* 팀원 관리 섹션 */}
      <CommonText type={CommonTextType.T4_BD_BLACK} text="팀원 관리" />
      {/* 이 워크스페이스의 팀원 섹션 */}
      <div className="flex flex-col">
        <CommonText type={CommonTextType.T5_SB_BLACK} text="이 워크스페이스의 팀원" />

        {/* 새로운 팀원 추가하기 섹션 */}
        <InputInviteMember
          title="새로운 팀원 추가하기"
          emails={emails}
          value={value}
          placeholder="초대할 팀원의 이메일을 입력해주세요."
          onValueChange={handleValueChange}
          onEmailsChange={handleEmailChange}
          onInvite={handleInvite}
          onRemove={handleRemoveEmail}
          className="mt-12pxr w-534pxr"
        />

        {/* 팀원 목록 */}
        <div className="gap-y-8pxr mt-16pxr flex flex-col">
          <CommonText type={CommonTextType.CAP1_RG_GRAY_200} text={`${title} 워크스페이스 팀원`} />

          {/* 팀원 카드 컴포넌트 */}
          <div className="gap-8pxr flex flex-row flex-wrap">
            {members.length > 0 ? (
              members.map((teammate, idx) => (
                <TeammateCard
                  key={idx}
                  name={teammate.name}
                  email={teammate.email}
                  onClose={() => {}} // TODO: API 연동 필요
                />
              ))
            ) : (
              <span>팀원이 없습니다.</span>
            )}
          </div>
        </div>
      </div>
      {/* 구분선 */}
      <hr className="border-stroke-200 w-full" />
      {/* SNS 연동 영역 */}
      <div className="flex flex-col">
        <CommonText type={CommonTextType.T5_SB_BLACK} text="SNS 연동" />
        {/* 연동된 인스타 계정 */}
        <CommonText
          type={CommonTextType.CAP1_RG_GRAY_200}
          text="연동된 Instagram 계정"
          className="mt-12pxr mb-8pxr"
        />
        {/* <연동헤제 + 계정변경 OR 연동하기 버튼 배경 없어서 그냥 넣음*/}
        {instagram?.instagramAccountName ? (
          <div className="gap-y-8pxr flex flex-col">
            <span className="border-stroke-200 rounded-4pxr px-10pxr text-b3-rg py-7pxr flex w-full cursor-default items-start justify-start border bg-[#F8F8FA] text-gray-400">
              @{instagram.instagramAccountName}
            </span>
            <div className="gap-x-12pxr flex flex-row items-center justify-start">
              <button
                className="text-cap1-md text-gray-200 underline"
                onClick={handleConnectInstagram}
              >
                계정 변경
              </button>
            </div>
          </div>
        ) : (
          <SocialConnectButton onClick={handleConnectInstagram} />
        )}
      </div>
      {/* 저장하기 버튼 */}
      <SaveButton className="mt-24pxr mb-36pxr" onClick={handleSave} />
    </div>
  );
};

export default WorkspaceSettingsMenu;
