import clsx from 'clsx';

import { ProfileSelectModalMenuState } from '../ProfileSelectModal.types';
import { ProfileSelectModalMenuButtonProps } from './ProfileSelectModalMenuButton.types';

export const ProfileSelectModalMenuButton = ({
  menuName,
  className,
  isSelected,
  onClick,
  ...props
}: ProfileSelectModalMenuButtonProps) => {
  return (
    <button
      className={clsx(
        'w-172pxr h-34pxr px-12pxr rounded-10pxr items-center justify-center',
        isSelected && 'bg-gray-600',
        className,
      )}
      onClick={onClick}
      {...props}
    >
      <p
        className={clsx('text-t7-sb text-start', {
          'text-black': isSelected,
          'text-gray-300': !isSelected,
          'text-system-red': menuName === ProfileSelectModalMenuState.LOGOUT,
        })}
      >
        {menuName}
      </p>
    </button>
  );
};
