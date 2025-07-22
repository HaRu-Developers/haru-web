'use client';

import { useState } from 'react';

import clsx from 'clsx';

import IndividualIcons from '@icons/IndividualIcons/IndividualIcons';
import { IndividualIconsState } from '@icons/IndividualIcons/IndividualIcons.types';

import { SelectBoxOptionProps } from './SelectBoxOption.types';

/*
 * 셀렉트 박스 옵션 선택
 */

const SelectBoxOption = ({
  options,
  initState,
  onClick,
  placeholder = '선택하세요',
  className,
}: SelectBoxOptionProps) => {
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
    <div
      className={clsx(
        'text-cap1-md relative flex flex-col items-center justify-center gap-y-1',
        className,
      )}
    >
      <button
        className={clsx(
          'border-stroke-200 h-34pxr rounded-6pxr pr-6pxr pl-12pxr gap-x-2pxr flex w-full cursor-pointer flex-row items-center justify-between bg-white text-gray-100',
          {
            'border-2': isOpen,
            border: !isOpen,
          },
        )}
        onClick={handleOpen}
      >
        <span className="w-full text-center">{selectedOption?.label || placeholder}</span>
        <IndividualIcons
          state={IndividualIconsState.UNDER_ARROW}
          className={clsx('pointer-events-none absolute right-0')}
        />
      </button>

      {isOpen && (
        <ul
          className={clsx(
            'text-b3-md border-stroke-200 rounded-8pxr top-38pxr shadow-dropdown-popup absolute z-10 flex flex-col items-start gap-2.5 self-stretch border bg-white px-1 py-1.5 text-nowrap text-gray-300',
            className,
          )}
        >
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

export default SelectBoxOption;
