'use client';

import { useState } from 'react';

import ChangableWorkspaceImage from '@common/components/ChangableWorkspaceImage/ChangableWorkspaceImage.client';
import AddWorkspaceButton from '@common/components/buttons/30px/AddWorkspaceButton/AddWorkspaceButton.client';
import SaveButton from '@common/components/buttons/38px/SaveButton/SaveButton.client';
import WorkspaceProfileImage from '@common/components/images/WorkspaceProfileImage/WorkspaceProfileImage.client';
import InputInviteMember from '@common/components/inputs/input-invite-member/InputInviteMember/InputInviteMember.client';

import CommonText from '../../CommonText/CommonText.server';
import { CommonTextType } from '../../CommonText/CommonText.types';
import TeammateCard from '../TeammateCard/TeammateCard.client';
import { Teammate, WorkspaceSettingsMenuProps } from './WorkspaceSettingsMenu.types';

const mockTeammates: Teammate[] = [
  {
    name: '홍길동',
    userId: 1,
    email: 'honggildong@example.com',
  },
  {
    name: '김철수',
    userId: 2,
    email: 'kimchulsoo@example.com',
  },
  {
    name: '이영희',
    userId: 3,
    email: 'leeyounghee@example.com',
  },
];

/**
 * 설정 - 워크스페이스 세팅 설정
 *
 */
const WorkspaceSettingsMenu = ({
  imageUrl,
  title,
  teammateList = mockTeammates,
}: WorkspaceSettingsMenuProps) => {
  // 내부적으로 처리 되서 반환 됩니다.
  const [value, setValue] = useState<string>('');
  const [emails, setEmails] = useState<string[]>([]);

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
    console.log('초대할 이메일 목록:', emails);
  };
  const handleClickWorkspaceImage = () => {
    console.log('워크스페이스 프로필 이미지 클릭');
  };

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
            initialPreview={imageUrl}
            onFileChange={(file) => {
              console.log('바뀐 워크스페이스 프로필 이미지 주소: ', file);
            }}
          />
        </div>

        {/* 워크스페이스 정보 섹션 - 워크스페이스 명*/}
        <div className="gap-y-8pxr flex flex-col">
          <CommonText type={CommonTextType.CAP1_RG_GRAY_300} text="워크스페이스 명" />
          <div className="py-7pxr px-10pxr text-b3-rg rounded-4pxr border-stroke-200 border text-black">
            {title ?? 'No Workspace Name'} {/* Fallback text if no name is provided */}
          </div>
        </div>
      </div>
      {/* 워크스페이스 추가 섹션 */}
      <div className="gap-y-12pxr flex w-full flex-col">
        <CommonText type={CommonTextType.T5_SB_BLACK} text="워크스페이스 추가" />
        <AddWorkspaceButton />
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
            {teammateList.length > 0 ? (
              teammateList.map((teammate, idx) => (
                <TeammateCard
                  key={idx}
                  name={teammate.name}
                  userId={teammate.userId}
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

      {/* 저장하기 버튼 */}
      <SaveButton className="my-26pxr" />
    </div>
  );
};

export default WorkspaceSettingsMenu;
