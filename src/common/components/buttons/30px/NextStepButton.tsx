import clsx from 'clsx';

interface NextStepButtonProps {
  isActive: boolean;
}

/**
 * '다음 단계로' 버튼
 */
const NextStepButton = ({ isActive }: NextStepButtonProps) => {
  return (
    <button
      className={clsx(
        'text-button-3 bg-primary inline-flex h-[30px] w-[87px] items-center justify-center rounded-[6px] px-[12px] py-[5px] text-white',
        !isActive && 'bg-primary-inactive',
      )}
    >
      다음 단계로
    </button>
  );
};

export default NextStepButton;
