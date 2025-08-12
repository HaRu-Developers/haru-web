'use client';

/*
  input으로써 검색 기능을 하지 않고 div 태그로 감싸서 링크로 이동하는 형태로 수정
  검색 페이지로 이동하는 링크를 클릭하면 검색 모달이 열리도록 구현
*/
import Link from 'next/link';

import IndividualIcons from '@icons/IndividualIcons/IndividualIcons';
import { IndividualIconsState } from '@icons/IndividualIcons/IndividualIcons.types';

import { InputSearchBoxProps } from './InputSearchBox.types';

const InputSearchBox = ({ searchHref, placeholder = '검색하기' }: InputSearchBoxProps) => {
  return (
    <Link href={searchHref} scroll={false}>
      <div className="border-stroke-200 hover:border-stroke-100 rounded-10pxr h-34pxr w-264pxr relative flex shrink-0 cursor-pointer items-center border bg-gray-600">
        <IndividualIcons
          state={IndividualIconsState.SEARCH}
          className="left-13pxr top-8pxr pointer-events-none absolute"
        />

        <div className="text-b3-rg left-36pxr pointer-events-none absolute text-gray-400">
          {placeholder}
        </div>
      </div>
    </Link>
  );
};

export default InputSearchBox;
