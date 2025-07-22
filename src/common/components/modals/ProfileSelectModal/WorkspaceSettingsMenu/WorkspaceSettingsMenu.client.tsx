'use client';

import { useState } from 'react';

import Image from 'next/image';

import AddWorkspaceButton from '@common/components/buttons/30px/AddWorkspaceButton/AddWorkspaceButton.client';
import SaveButton from '@common/components/buttons/38px/SaveButton/SaveButton.client';
import InputInviteMember from '@common/components/inputs/input-invite-member/InputInviteMember/InputInviteMember.client';

import CommonText from '../../CommonText/CommonText.server';
import { CommonTextType } from '../../CommonText/CommonText.types';
import TeammateCard from '../TeammateCard/TeammateCard.client';
import { Teammate, WorkspaceSettingsMenuProps } from './WorkspaceSettingsMenu.types';

const mockTeammates: Teammate[] = [
  {
    name: '홍길동',
    userId: 1n,
    email: 'honggildong@example.com',
  },
  {
    name: '김철수',
    userId: 2n,
    email: 'kimchulsoo@example.com',
  },
  {
    name: '이영희',
    userId: 3n,
    email: 'leeyounghee@example.com',
  },
];

/**
 * 설정 - 워크스페이스 세팅 설정
 *
 */
const WorkspaceSettingsMenu = ({
  imageUrl,
  workspaceName,
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
  return (
    <div className="px-35pxr py-24pxr scrollbar-component gap-y-24pxr flex h-full w-full flex-col overflow-y-auto">
      <CommonText type={CommonTextType.T4_BD_BLACK} text="워크스페이스 기본 정보" />
      {/* 워크스페이스 정보 섹션 */}
      <div className="gap-y-12pxr flex flex-col">
        <CommonText type={CommonTextType.T5_SB_BLACK} text="워크스페이스 정보" />
        {/* 워크스페이스 정보 섹션 - 워크스페이스 대표 사진*/}

        <div className="gap-y-8pxr flex flex-col">
          <CommonText type={CommonTextType.CAP1_RG_GRAY_300} text="워크스페이스 대표 사진" />
          <div className="w-76pxr h-76pxr p-8pxr rounded-9pxr border-stroke-100 border">
            {/* next/image는 width/height 또는 fill이 필수이기 때문에 중첩해서 div 적용 */}
            <div className="relative h-full w-full">
              <Image
                src={imageUrl ?? 'https://picsum.photos/200'} // Fallback image if no URL is provided
                alt="워크스페이스 대표 사진"
                fill
              />
            </div>
          </div>
        </div>

        {/* 워크스페이스 정보 섹션 - 워크스페이스 명*/}
        <div className="gap-y-8pxr flex flex-col">
          <CommonText type={CommonTextType.CAP1_RG_GRAY_300} text="워크스페이스 명" />
          <div className="py-7pxr px-10pxr text-b3-rg rounded-4pxr border-stroke-200 border text-black">
            {workspaceName || 'No Workspace Name'} {/* Fallback text if no name is provided */}
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
          className="mt-12pxr"
        />

        {/* 팀원 목록 */}
        <div className="gap-y-8pxr mt-16pxr flex flex-col">
          <CommonText
            type={CommonTextType.CAP1_RG_GRAY_200}
            text={`${workspaceName} 워크스페이스 팀원`}
          />

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
