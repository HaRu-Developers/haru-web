'use client';

import clsx from 'clsx';

import { InputFieldModalProps } from './InputFieldModal.types';

/**
 * 입력 필드 모달 컴포넌트
 * @param title - 모달 제목
 * @param placeholder - 입력 필드 플레이스홀더
 * @param value - 입력 필드 값
 * @param type - 입력 필드 타입 (기본값: 'text')
 * @param onChange - 입력 필드 값 변경 핸들러
 * @param className - 추가 클래스 이름
 */
const InputFieldModal = ({
  title,
  placeholder,
  value,
  type,
  onChange,
  className,
}: InputFieldModalProps) => {
  return (
    <div className={clsx('gap-y-8pxr flex w-full flex-col justify-center', className)}>
      {title && <p className="text-cap1-rg h-16pxr text-left text-gray-200">{title}</p>}
      <input
        type={type ?? 'text'}
        className="py-6pxr px-12pxr text-b3-rg rounded-4pxr focus:border-stroke-selected h-36pxr flex w-full items-center justify-center border border-gray-400 text-black focus:border-2"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default InputFieldModal;
