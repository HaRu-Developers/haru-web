'use client';

import { InputFieldModalProps } from './InputFieldModal.types';

const InputFieldModal = ({ title, placeholder, value, type, onChange }: InputFieldModalProps) => {
  return (
    <div className="w-534pxr gap-y-8pxr flex flex-col justify-center">
      <p className="text-cap1-rg h-16pxr text-left text-gray-200">{title}</p>
      <input
        type={type || 'text'}
        className="pxr py-6pxr px-12pxr text-b3-rg rounded-4pxr focus:border-stroke-selected h-36pxr flex w-full items-center justify-center border border-gray-400 text-black focus:border-2"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default InputFieldModal;
