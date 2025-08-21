import clsx from 'clsx';

import FeatureTabIcons from '@icons/FeatureTabIcons/FeatureTabIcons';
import { FeatureTabIconsState } from '@icons/FeatureTabIcons/FeatureTabIcons.types';

import { CopyButtonProps } from './CopyButton.types';

/**
 * 클립보드에 링크를 복사하는 버튼 컴포넌트입니다.
 * link이 제공되지 않으면 현재 URL을 복사합니다.
 */
const CopyButton = ({ link, onClick, className, isHoverable = true }: CopyButtonProps) => {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (link) {
      navigator.clipboard.writeText(link);
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
    onClick?.();
  };
  return (
    <div
      className={clsx(
        'p-6pxr rounded-7pxr flex cursor-pointer items-center justify-center',
        className,
        {
          'hover:bg-gray-600': isHoverable,
        },
      )}
      onClick={handleClick}
    >
      <FeatureTabIcons state={FeatureTabIconsState.COPY} />
    </div>
  );
};

export default CopyButton;
