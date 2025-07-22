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
  // 로그아웃에 대해서는 별도로 처리함, onClose 등 연동 필요합니다.

  if (menuName === ProfileSelectModalMenuState.LOGOUT) {
    return (
      <button
        className={clsx(
          'w-172pxr h-34pxr px-12pxr rounded-10pxr flex items-center justify-center hover:bg-gray-600',
          isSelected && 'bg-gray-600',
          className,
        )}
        onClick={onClick}
        {...props}
      >
        <p className="text-system-red text-b3-rg w-full text-start">{menuName}</p>
      </button>
    );
  }

  return (
    <button
      className={clsx(
        'w-172pxr h-34pxr px-12pxr rounded-10pxr flex items-center justify-center hover:bg-gray-600',
        isSelected && 'bg-gray-600',
        className,
      )}
      onClick={onClick}
      {...props}
    >
      <p
        className={clsx('w-full text-start', {
          'text-t6-sb text-black': isSelected,
          'text-b3-rg text-gray-300': !isSelected,
        })}
      >
        {menuName}
      </p>
    </button>
  );
};
