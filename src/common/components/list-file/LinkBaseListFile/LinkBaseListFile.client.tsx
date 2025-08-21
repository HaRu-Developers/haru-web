'use client';

import { useState } from 'react';

import clsx from 'clsx';

import CheckboxIcons from '@icons/CheckboxIcons/CheckboxIcons';
import { CheckboxIconsState } from '@icons/CheckboxIcons/CheckboxIcons.types';
import FeaturedFileIcons from '@icons/FeaturedFileIcons/FeaturedFileIcons';

import { BaseListFileProps } from './LinkBaseListFile.types';

const LinkBaseListFile = ({
  id,
  title,
  subtitle,
  href,
  fileIconState,
  isCheckMode = false,
  isChecked = false,
  onCheckToggle,
  rightContent,
  className,
  isSelectable = true,
}: BaseListFileProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    onCheckToggle?.(id);
  };

  const showCheckbox = isSelectable && (isCheckMode || isHovered);

  // a 태그 중첩 방지를 위해 최상위는 div, 클릭 시 라우팅은 onClick 핸들러로 처리
  const handleClick = () => {
    if (href && !isCheckMode) {
      window.location.href = href; // 또는 router.push(href)
    } else {
      onCheckToggle?.(id);
    }
  };

  return (
    <div
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={clsx(
        'h-73pxr flex w-full items-center justify-between transition-colors',
        {
          'bg-gray-600': isChecked,
          'hover:bg-gray-600': !isChecked,
        },
        className,
      )}
    >
      <div className="gap-x-10pxr flex items-center">
        <div
          className={clsx(
            'rounded-6pxr h-36pxr w-36pxr flex flex-shrink-0 items-center justify-center',
            // 선택 가능, 선택 안됐고, 호버 안됐을 때 배경 흰색으로
            isSelectable && isCheckMode && !isChecked && !isHovered ? 'bg-white' : 'bg-gray-600',
          )}
          onClick={isSelectable ? handleToggle : undefined}
        >
          {showCheckbox ? (
            isChecked ? (
              <CheckboxIcons state={CheckboxIconsState.SIZE_24_SQUARE_CHECKBOX_ENABLED} />
            ) : (
              <CheckboxIcons state={CheckboxIconsState.SIZE_24_SQUARE_CHECKBOX_DISABLED} />
            )
          ) : (
            <FeaturedFileIcons state={fileIconState} />
          )}
        </div>

        <div className="gap-y-5pxr flex flex-col">
          <h3 className="text-t5-sb cursor-pointer text-black">{title}</h3>
          <p className="text-cap2-rg text-gray-300">{subtitle}</p>
        </div>
      </div>

      {rightContent && !isCheckMode && <div className="flex items-center">{rightContent}</div>}
    </div>
  );
};

export default LinkBaseListFile;
