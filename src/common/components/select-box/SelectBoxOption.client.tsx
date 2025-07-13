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
    <div className="text-cap1-md flex w-fit flex-col items-start gap-1">
      <button
        className={clsx(
          'border-stroke-200 h-34pxr rounded-6pxr flex cursor-pointer bg-white px-4 py-1.5 pr-1.5 pl-3 text-gray-100',
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
        <ul className="text-b3-md border-stroke-200 rounded-8pxr flex flex-col items-start gap-2.5 self-stretch border bg-white px-1 py-1.5 text-gray-300">
          {/* box-shadow 추가 */}
          {options.map((option, idx) => (
            <li
              key={idx}
              onClick={() => handleSelect(option.state)}
              className={clsx(
                'h-32pxr rounded-6pxr flex cursor-pointer items-center justify-center gap-1.5 self-stretch px-3.5 py-1.5 hover:bg-gray-600',
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
