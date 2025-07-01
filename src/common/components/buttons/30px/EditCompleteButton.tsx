import clsx from 'clsx';

interface EditCompleteButtonProps {
  onClick?: () => void;
}

/**
 * '수정 완료' 버튼
 */
const EditCompleteButton = ({ onClick }: EditCompleteButtonProps) => {
  return (
    <button
      className={clsx(
        'text-button-3 bg-primary inline-flex h-[30px] w-[76px] items-center justify-center rounded-[100px] px-[12px] py-[6px] text-white',
      )}
      onClick={onClick}
    >
      수정 완료
    </button>
  );
};

export default EditCompleteButton;
