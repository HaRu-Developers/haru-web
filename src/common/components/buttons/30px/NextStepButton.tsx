import clsx from 'clsx';

interface NextStepButtonProps {
  disabled?: boolean;
  onClick?: () => void;
}

/**
 * '다음 단계로' 버튼
 */
const NextStepButton = ({ disabled, onClick }: NextStepButtonProps) => {
  return (
    <button
      className={clsx(
        'text-button-3 bg-primary inline-flex h-[30px] w-[87px] items-center justify-center rounded-[6px] px-[12px] py-[5px] text-white',
        disabled && 'bg-primary-inactive',
      )}
      onClick={onClick}
    >
      다음 단계로
    </button>
  );
};

export default NextStepButton;
