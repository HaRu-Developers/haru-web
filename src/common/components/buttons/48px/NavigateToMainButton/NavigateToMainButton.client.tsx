import clsx from 'clsx';

interface NavigateToMainButtonProps {
  isActive: boolean;
}

/**
 * '메인 홈으로 이동' 버튼
 */
const NavigateToMainButton = ({ isActive }: NavigateToMainButtonProps) => {
  return (
    <button
      className={clsx(
        'text-button-1 inline-flex h-[48px] w-[260px] items-center justify-center rounded-[9px] px-[12px] py-[17px] text-white',
        isActive ? 'bg-gray-100' : 'bg-gray-500',
      )}
    >
      메인 홈으로 이동
    </button>
  );
};

export default NavigateToMainButton;
