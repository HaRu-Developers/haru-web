import { useState } from 'react';

import clsx from 'clsx';

import IndividualIcons from '@icons/IndividualIcons/IndividualIcons';
import { IndividualIconsState } from '@icons/IndividualIcons/IndividualIcons.types';

import { SelectBoxProps } from './SelectBoxOption.types';

/*
 * 셀렉트 박스 옵션 선택
 */

const SelectBox = ({ options, initState, onClick, placeholder = '선택하세요' }: SelectBoxProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [state, setstate] = useState<string>(initState);
  const selectedOption = options.find((option) => option.state === state);
  const handleSelect = (state: string) => {
    setstate(state);
    onClick(state);
    setIsOpen(false);
  };

  const handleOpen = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <div className="text-cap1-md flex w-fit flex-col items-start gap-[4px]">
      <button
        className={clsx(
          'border-stroke-200 flex h-[34px] cursor-pointer rounded-[6px] bg-white px-4 py-[6px] pr-[6px] pl-[12px] text-gray-100',
          {
            'border-[2px]': isOpen,
            border: !isOpen,
          },
        )}
        onClick={handleOpen}
      >
        {selectedOption?.label || placeholder}
        <IndividualIcons
          state={IndividualIconsState.UNDER_ARROW}
          className={clsx('pointer-events-none')}
        />
      </button>

      {isOpen && (
        <ul className="text-b3-md border-stroke-200 flex flex-col items-start gap-[10px] self-stretch rounded-[8px] border bg-white px-[4px] py-[6px] text-gray-300">
          {/* box-shadow 추가 */}
          {options.map((option, idx) => (
            <li
              key={idx}
              onClick={() => handleSelect(option.state)}
              className={clsx(
                'flex h-[32px] cursor-pointer items-center justify-center gap-[6px] self-stretch rounded-[6px] px-[14px] py-[6px] hover:bg-gray-600',
                {
                  'bg-gray-600 text-gray-100': state === option.state,
                },
              )}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SelectBox;
