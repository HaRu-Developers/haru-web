import { useState } from 'react';

import clsx from 'clsx';

import ChevronDownOutline from '@common/svgs/ChevronDownOutline.svg';

/*
 * 셀렉트 박스 옵션 선택
 */
interface Option {
  value: string;
  label: string;
}

interface SelectBoxProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const SelectBox = ({ options, value, onChange, placeholder = '선택하세요' }: SelectBoxProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedOption = options.find((opt) => opt.value === value);

  const handleSelect = (val: string) => {
    onChange(val);
    setIsOpen(false);
  };

  return (
    <div className="text-caption-1 flex w-fit flex-col items-start gap-[4px] font-medium">
      <button
        className="border-stroke-200 flex h-[34px] rounded-[6px] border-[2px] bg-white px-4 py-[6px] pr-[6px] pl-[12px] text-gray-100"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {selectedOption?.label || placeholder}
        <ChevronDownOutline />
      </button>
      {isOpen && (
        <ul className="text-button-3 border-stroke-200 flex flex-col items-start gap-[10px] self-stretch rounded-[8px] border bg-white px-[4px] py-[6px] text-gray-300">
          {/* box-shadow 추가 */}
          {options.map((opt) => (
            <li
              key={opt.value}
              onClick={() => handleSelect(opt.value)}
              className={clsx(
                'flex h-[32px] cursor-pointer items-center justify-center gap-[6px] self-stretch rounded-[6px] px-[14px] py-[6px] hover:bg-gray-600',
                value === opt.value && 'bg-gray-600 text-gray-100',
              )}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SelectBox;
