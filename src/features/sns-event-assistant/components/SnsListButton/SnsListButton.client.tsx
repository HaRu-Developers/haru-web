import clsx from 'clsx';

import { SnsListButtonProps } from './SnsListButton.types';

const SnsListButton = ({ value, onClick, isToggle, num }: SnsListButtonProps) => {
  return (
    <button
      className={clsx(
        'px-9pxr py-6pxr rounded-7pxr flex items-center justify-center hover:bg-gray-600',
        {
          'bg-gray-600': isToggle,
        },
      )}
      onClick={onClick}
    >
      <span
        className={clsx('text-black', {
          'text-bt3-sb': isToggle,
          'text-cap1-md': !isToggle,
        })}
      >
        {value}
        {num && (
          <span
            className={clsx('text-cap1-rg', {
              'text-gray-200': isToggle,
              'text-gray-400': !isToggle,
            })}
          >{` ${num}`}</span>
        )}
      </span>
    </button>
  );
};

export default SnsListButton;
