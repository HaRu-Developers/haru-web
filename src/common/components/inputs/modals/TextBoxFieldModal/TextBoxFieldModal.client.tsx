'use client';

import clsx from 'clsx';

import { TextBoxFieldModalProps } from './TextBoxFieldModal.types';

const TextBoxFieldModal = ({
  title,
  placeholder,
  value,
  onChange,
  className,
}: TextBoxFieldModalProps) => {
  return (
    <div className={clsx('w-534pxr gap-y-8pxr flex flex-col justify-center', className)}>
      <p className="text-cap1-rg h-16pxr text-left text-gray-200">{title}</p>
      <textarea
        className="scrollbar-page pxr py-10pxr px-12pxr text-b3-rg rounded-4pxr focus:border-stroke-selected h-166pxr flex w-full resize-none items-center justify-center border border-gray-400 text-black focus:border-2"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default TextBoxFieldModal;
