import React, { useState } from 'react';

import clsx from 'clsx';

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
      <div
        className={clsx('flex h-[16px] w-[16px] items-center justify-center text-gray-400')}
        onClick={handleRemove}
      >
        ✕
      </div>
    </div>
  );
};

const InputInviteMember = ({ title, placeholder, onChange }: InputInviteMemberProps) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [emails, setEmails] = useState<string[]>([]);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (onChange) {
      onChange(e.target.value);
    }
  };
  const handleOnClick = () => {
    if (!inputValue) return;
    setEmails((prev) => [...prev, inputValue]);
    setInputValue('');
  };
  const handleFocus = () => {
    setIsFocused(true);
  };
  const handleBlur = () => {
    setIsFocused(false);
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
          {emails.map((e, idx) => (
            <EmailButton
              key={idx}
              email={e}
              onRemove={() => {
                setEmails((prev) => prev.filter((_, i) => i !== idx));
              }}
            />
          ))}
          <input
            type="text"
            value={inputValue}
            placeholder={emails.length > 0 ? '' : placeholder}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className={clsx('h-[30px] flex-1 outline-none')}
          ></input>
        </div>
        <button
          className={clsx(
            'bg-primary text-bt2-sb flex h-[32px] items-center justify-center gap-[6px] rounded-[6px] px-[11px] py-[8px] whitespace-nowrap text-white',
          )}
        >
          초대
        </button>
      </div>
      {/* box-shadow 추가할 것 */}
      {inputValue && (
        <div
          className={clsx(
            'border-stroke-200 flex flex-col items-start gap-[10px] self-stretch rounded-[8px] border px-[4px] py-[6px]',
          )}
        >
          <div
            className={clsx(
              'flex h-[32px] cursor-pointer items-center gap-[6px] self-stretch rounded-[6px] bg-gray-600 px-[10px] py-[6px]',
            )}
            onClick={handleOnClick}
          >
            {/* 아이콘 추가 예정 */}
            <div className={clsx('h-[20px] w-[20px] bg-gray-300')} />
            <span className={clsx('text-b3-md text-gray-100')}>{inputValue}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default InputInviteMember;
