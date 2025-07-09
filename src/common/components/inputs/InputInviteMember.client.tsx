import React, { useEffect, useState } from 'react';

import clsx from 'clsx';

import CrossIcons from '@icons/CrossIcons/CrossIcons';
import '@icons/CrossIcons/CrossIcons.types';
import { CrossIconsState } from '@icons/CrossIcons/CrossIcons.types';

import { InputInviteMemberProps } from './InputInviteMember.types';

/*
  인풋 멤버 초대 컴포넌트
 */

interface EmailButtonProps {
  email: string;
  onRemove: () => void;
}
const EmailButton = ({ email, onRemove }: EmailButtonProps) => {
  const handleRemove = () => {
    onRemove();
  };
  return (
    <div
      className={clsx(
        'text-b3-rg flex h-[30px] items-center gap-[3px] rounded-[7px] bg-gray-600 px-[9px] py-[6px] text-gray-200',
      )}
    >
      <span>{email}</span>
      <div onClick={handleRemove}>
        <CrossIcons state={CrossIconsState.SIZE_16_GRAY_400} className={clsx('cursor-pointer')} />
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
    <div className={clsx('text-b3-rg flex w-[534px] flex-col items-start gap-[8px]')}>
      <span className={clsx('text-cap1-rg text-gray-200')}>{title}</span>
      <div
        className={clsx(
          'h-min-[48px] flex w-full shrink-0 items-center justify-between gap-[10px] rounded-[9px] px-[14px] py-[9px]',
          {
            'border-stroke-100 border': !isFocused,
            'border-stroke-selected border-[2px]': isFocused,
          },
        )}
      >
        <div className={clsx('flex w-full flex-wrap gap-[8px]')}>
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
            className={clsx('h-[30px] flex-1 outline-none')}
          ></input>
        </div>
        {/* 버튼 컴포넌트 제작 시 통합 예정 */}
        <button
          className={clsx(
            'bg-primary text-bt2-sb flex h-[32px] cursor-pointer items-center justify-center gap-[6px] rounded-[6px] px-[11px] py-[8px] whitespace-nowrap text-white',
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
            'border-stroke-200 flex flex-col items-start gap-[10px] self-stretch rounded-[8px] border px-[4px] py-[6px]',
          )}
        >
          <div
            className={clsx(
              'flex h-[32px] cursor-pointer items-center gap-[6px] self-stretch rounded-[6px] bg-gray-600 px-[10px] py-[6px]',
            )}
            onClick={handleAddEmail}
          >
            {/* 아이콘 추가 예정 */}
            <div className={clsx('h-[20px] w-[20px] bg-gray-300')} />
            <span className={clsx('text-b3-md text-gray-100')}>{value}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default InputInviteMember;
