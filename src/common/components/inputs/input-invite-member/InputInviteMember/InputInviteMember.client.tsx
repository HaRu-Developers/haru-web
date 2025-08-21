'use client';

import { useMemo, useState } from 'react';

import clsx from 'clsx';

import useGetUserListFromEmail from '@api/user/get/queries/useGetUserListFromEmail';

import { isValidEmail } from '@common/utils/valid-email.utils';

import useDebounce from '@common/hooks/useDebounce';

import InviteButton from '@common/components/buttons/32px/InviteButton/InviteButton.client';
import EmailChip from '@common/components/inputs/input-invite-member/emails/EmailChip/EmailChip.client';
import EmailTag from '@common/components/inputs/input-invite-member/emails/EmailTag/EmailTag.client';
import { CONFIG } from '@common/components/modals/SearchModal/SearchModal.types';

import { InputInviteMemberProps } from './InputInviteMember.types';

/*
  인풋 멤버 초대 컴포넌트
*/
const InputInviteMember = ({
  title,
  placeholder,
  value = '',
  emails = [],
  isInviting,
  onValueChange,
  onEmailsChange,
  onInvite,
  onRemove,
  className,
}: InputInviteMemberProps) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const debouncedSearchQuery = useDebounce(value.trim(), CONFIG.SEARCH_DEBOUNCE_MS);
  const { extra: users } = useGetUserListFromEmail(debouncedSearchQuery);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onValueChange?.(e.target.value);
  };
  const usersEmails = useMemo(() => users?.map((user) => user.email) ?? [], [users]);
  const handleAddEmail = (newValue: string) => {
    const trimmed = newValue.trim();
    // 입력값이 비어있거나 유효하지 않은 이메일인 경우
    if (!trimmed || !isValidEmail(trimmed)) {
      onValueChange?.('');
      console.log('유효하지 않은 이메일입니다.');
      return;
    }
    // 이미 존재하는 이메일인 경우
    if (emails.includes(trimmed)) {
      onValueChange?.('');
      console.log('이미 존재하는 이메일입니다.');
      return;
    }
    onEmailsChange?.([...emails, trimmed]);
    onValueChange?.('');
  };

  const handleRemoveEmail = (email: string) => {
    onRemove?.(email);
    const newEmails = emails.filter((e) => e !== email);
    onEmailsChange?.(newEmails);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // 추천 이메일 목록이 있는지 확인
    const hasSuggestions = usersEmails && usersEmails.length > 0;

    if (e.key === 'Enter') {
      e.preventDefault();
      // 1. 추천 항목이 선택된 경우 (selectedIndex > 0)
      if (hasSuggestions && selectedIndex > 0) {
        // 선택된 인덱스는 1부터 시작하므로 -1을 해줘야 배열 인덱스와 일치
        const emailToAdd = usersEmails[selectedIndex - 1];
        handleAddEmail(emailToAdd);
      }
      // 2. 추천 항목이 선택되지 않고 입력된 이메일을 추가하려는 경우
      else {
        // 현재 입력된 이메일 값을 추가
        handleAddEmail(value);
      }
      // 추가 후 selectedIndex 초기화
      setSelectedIndex(0);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prevIndex) =>
        // 추천 목록의 마지막 항목을 넘지 않도록
        hasSuggestions && prevIndex < usersEmails.length ? prevIndex + 1 : prevIndex,
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
    } else if (e.key === 'Backspace' && value.length === 0 && emails.length > 0) {
      // 이미 추가된 이메일 칩을 지우는 로직
      const lastEmail = emails[emails.length - 1];
      handleRemoveEmail(lastEmail);
    }
  };

  const handleInvite = () => {
    if (emails.length === 0) return;
    onInvite?.(emails);
  };
  const isDisabled = emails.length === 0;
  return (
    <div className={clsx('text-b3-rg flex flex-col items-start gap-2', className)}>
      {/* 타이틀 부분 */}
      {title && <span className="text-cap1-rg text-gray-200">{title}</span>}
      {/* 이메일 입력 및 초대 버튼 부분 */}
      <div className="flex w-full flex-col gap-1">
        <div
          className={clsx(
            'rounded-9pxr py-9pxr flex w-full shrink-0 items-center justify-between gap-2.5 px-3.5',
            {
              'border-stroke-100 border': !isFocused,
              'border-stroke-selected border-2': isFocused,
            },
          )}
        >
          <div
            className={clsx(
              'max-h-120pxr scrollbar-component flex w-full max-w-full flex-wrap gap-2 overflow-x-auto overflow-y-auto',
            )}
          >
            {emails.map((email) => (
              <EmailChip key={email} email={email} onRemove={handleRemoveEmail} />
            ))}
            <input
              type="text"
              value={value}
              placeholder={emails.length > 0 ? '' : placeholder}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onKeyDown={handleInputKeyDown}
              className={clsx('h-30pxr flex-1 outline-none')}
            />
          </div>
          <InviteButton
            onClick={handleInvite}
            disabled={isDisabled}
            className={clsx({ 'cursor-default': isDisabled })}
            isPending={isInviting}
          />
        </div>
        {value.trim() && (
          <EmailTag
            value={value}
            onClick={handleAddEmail}
            emails={usersEmails}
            state={selectedIndex}
          />
        )}
      </div>
    </div>
  );
};

export default InputInviteMember;
