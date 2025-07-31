'use client';

import { useState } from 'react';

import clsx from 'clsx';

import { isValidEmail } from '@common/utils/valid-email.utils';

import InviteButton from '@common/components/buttons/32px/InviteButton/InviteButton.client';
import EmailChip from '@common/components/inputs/input-invite-member/emails/EmailChip/EmailChip.client';
import EmailTag from '@common/components/inputs/input-invite-member/emails/EmailTag/EmailTag.client';

import { InputInviteMemberProps } from './InputInviteMember.types';

/*
  인풋 멤버 초대 컴포넌트
*/
const InputInviteMember = ({
  title,
  placeholder,
  value = '',
  emails = [],
  onValueChange,
  onEmailsChange,
  onInvite,
  onRemove,
  className,
}: InputInviteMemberProps) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onValueChange?.(e.target.value);
  };

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
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddEmail(value);
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
            'h-min-48pxr rounded-9pxr py-9pxr flex w-full shrink-0 items-center justify-between gap-2.5 px-3.5',
            {
              'border-stroke-100 border': !isFocused,
              'border-stroke-selected border-2': isFocused,
            },
          )}
        >
          <div className={clsx('flex w-full flex-wrap gap-2')}>
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
          />
        </div>
        {value.trim() && <EmailTag value={value} onClick={handleAddEmail} />}
      </div>
    </div>
  );
};

export default InputInviteMember;
