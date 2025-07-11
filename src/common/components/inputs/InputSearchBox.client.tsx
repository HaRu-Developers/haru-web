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
    <div className="border-stroke-200 hover:border-stroke-100 rounded-10pxr h-34pxr w-264pxr relative flex shrink-0 items-center gap-2.5 border bg-gray-600">
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        className="text-b3-rg h-34pxr w-264pxr py-7pxr px-9 outline-none placeholder:text-gray-400"
      />
      <IndividualIcons
        state={IndividualIconsState.SEARCH}
        className="left-14pxr top-8pxr pointer-events-none absolute"
      />
    </div>
  );
};

export default InputSearchBox;
