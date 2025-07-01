import clsx from 'clsx';

interface CompleteSelectButtonProps {
  onClick?: () => void;
}

/**
 * '선택 완료' 버튼.
 */
const CompleteSelectButton = ({ onClick }: CompleteSelectButtonProps) => {
  return (
    <button
      className={clsx(
        'text-button-2 bg-primary inline-flex h-[32px] w-[75px] items-center justify-center rounded-[6px] px-[12px] py-[8px] text-white',
      )}
      onClick={onClick}
    >
      선택 완료
    </button>
  );
};

export default CompleteSelectButton;
