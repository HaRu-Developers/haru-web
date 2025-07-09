import clsx from 'clsx';

import IndividualIcons from '@common/components/icons/IndividualIcons/IndividualIcons';
import { IndividualIconsState } from '@common/components/icons/IndividualIcons/IndividualIcons.types';

import { InputSerchBoxProps } from './InputSearchBox.types';

/**
 * 인풋 검색 박스 컴포넌트
 */

const InputSearchBox = ({ onChange, placeholder = '검색하기', value }: InputSerchBoxProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(event.target.value);
  };
  return (
    <div
      className={clsx(
        'border-stroke-200 hover:border-stroke-100 shink-0 relative flex h-[34px] w-[264px] items-center gap-[10px] rounded-[10px] border bg-gray-600',
      )}
    >
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        className={clsx(
          'text-b3-rg h-[34px] w-[264px] px-[36px] py-[7px] outline-none placeholder:text-gray-400',
        )}
      />
      <IndividualIcons
        state={IndividualIconsState.SEARCH}
        className="pointer-events-none absolute top-[8px] left-[14px]"
      />
    </div>
  );
};

export default InputSearchBox;
