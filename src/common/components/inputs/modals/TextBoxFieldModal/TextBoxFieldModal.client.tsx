'use client';

import { TextBoxFieldModalProps } from './TextBoxFieldModal.types';

const TextBoxFieldModal = ({ title, placeholder, value, onChange }: TextBoxFieldModalProps) => {
  return (
    <div className="w-534pxr gap-y-8pxr flex flex-col justify-center">
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
