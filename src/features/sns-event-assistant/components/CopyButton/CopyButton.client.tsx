import clsx from 'clsx';

import FeatureTabIcons from '@icons/FeatureTabIcons/FeatureTabIcons';
import { FeatureTabIconsState } from '@icons/FeatureTabIcons/FeatureTabIcons.types';

import { CopyButtonProps } from './CopyButton.types';

const CopyButton = ({ link, onClick, className, isHoverable = true }: CopyButtonProps) => {
  const handleClick = () => {
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
