'use client';

import { useEffect, useState } from 'react';

import clsx from 'clsx';

import CrossIcons from '@icons/CrossIcons/CrossIcons';
import { CrossIconsState } from '@icons/CrossIcons/CrossIcons.types';
import IndividualIcons from '@icons/IndividualIcons/IndividualIcons';
import { IndividualIconsState } from '@icons/IndividualIcons/IndividualIcons.types';

import { EmailButtonProps, InputInviteMemberProps } from './InputInviteMember.types';

/*
  인풋 멤버 초대 컴포넌트
 */

const EmailButton = ({ email, onRemove }: EmailButtonProps) => {
  const handleRemove = () => {
    onRemove();
  };
  return (
    <div className="text-b3-rg h-30pxr gap-3pxr rounded-7pxr px-9pxr flex items-center bg-gray-600 py-1.5 text-gray-200">
      <span>{email}</span>
      <div onClick={handleRemove}>
        <CrossIcons state={CrossIconsState.SIZE_16_GRAY_400} className="cursor-pointer" />
      </div>
    </div>
  );
};

const InputInviteMember = ({
  title,
  inputValue: propInputValue = '',
  inputEmails: propInputEmails = [],
  placeholder,
  onChange,
  onEmailsChange,
  onInvite,
}: InputInviteMemberProps) => {
  const [value, setValue] = useState<string>(propInputValue);
  const [emails, setEmails] = useState<string[]>(propInputEmails);
  const [isFocused, setIsFocused] = useState<boolean>(false);

  useEffect(() => {
    setValue(value);
  }, [value]);

  useEffect(() => {
    setEmails(emails);
  }, [emails]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  const handleAddEmail = () => {
    if (!value.trim()) return;
    if (emails.includes(value.trim())) {
      setValue('');
      return;
    }

    const newEmails = [...emails, value.trim()];
    setEmails(newEmails);
    setValue('');

    if (onEmailsChange) {
      onEmailsChange(newEmails);
    }
  };

  const handleRemoveEmail = (indexToRemove: number) => {
    const newEmails = emails.filter((_, i) => i !== indexToRemove);
    setEmails(newEmails);

    if (onEmailsChange) {
      onEmailsChange(newEmails);
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleInviteClick = () => {
    if (onInvite) {
      onInvite(emails);
    }
    setEmails([]);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddEmail();
    }
  };

  return (
    <div className="text-b3-rg w-534pxr flex flex-col items-start gap-2">
      <span className="text-cap1-rg text-gray-200">{title}</span>
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
          {emails.map((email, idx) => (
            <EmailButton key={idx} email={email} onRemove={() => handleRemoveEmail(idx)} />
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
          ></input>
        </div>
        {/* 버튼 컴포넌트 제작 시 통합 예정 */}
        <button
          className={clsx(
            'bg-primary text-bt2-sb h-32pxr rounded-6pxr px-11pxr flex cursor-pointer items-center justify-center gap-1.5 py-2 whitespace-nowrap text-white',
          )}
          onClick={handleInviteClick}
        >
          초대
        </button>
      </div>
      {/* box-shadow 추가 할 예정 */}
      {value.trim() && (
        <div
          className={clsx(
            'border-stroke-200 rounded-8pxr flex flex-col items-start gap-2.5 self-stretch border px-1 py-1.5',
          )}
        >
          <div
            className={clsx(
              'rounded-6pxr h-32pxr flex cursor-pointer items-center gap-1.5 self-stretch bg-gray-600 px-2.5 py-1.5',
            )}
            onClick={handleAddEmail}
          >
            {/* 아이콘 추가 예정 */}
            <IndividualIcons state={IndividualIconsState.EMAIL} />
            <span className={clsx('text-b3-md text-gray-100')}>{value}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default InputInviteMember;
