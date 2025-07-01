import clsx from 'clsx';

import Search from '@/common/svgs/individual/SearchIcon.svg';

import { InputSerchBoxProps } from './InputSearchBox.types';

/**
 * 인풋 검색 박스 컴포넌트
 */

const InputSearchBox = ({
  mode = 'default',
  onChange,
  placeholder = '검색하기',
  value,
}: InputSerchBoxProps) => {
  return (
    <div
      className={clsx(
        'inline-flex h-[34px] w-[264px] items-center gap-[4px] rounded-[10px] border bg-gray-600 px-[12px] py-[7px]',
        {
          'border-stroke-200': mode === 'default',
          'border-stroke-100': mode === 'hover',
        },
      )}
    >
      <Search height="18" width="18" />
      <input
        type="text"
        className={clsx(
          'text-body-3 h-[34px] w-[264px] font-normal text-black outline-none placeholder:text-gray-400',
        )}
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChange?.(event.target.value)}
      />
    </div>
  );
};

export default InputSearchBox;
