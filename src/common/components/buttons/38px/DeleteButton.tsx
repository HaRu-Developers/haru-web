import clsx from 'clsx';

/**
 * '삭제하기' 버튼
 */
const DeleteButton = () => {
  return (
    <button
      className={clsx(
        'text-button-1 border-inner-w-1-stroke-200 text-system-red inline-flex h-[38px] w-[128px] items-center justify-center rounded-[7px] bg-white px-[16px] py-[12px] hover:bg-gray-600',
      )}
    >
      삭제하기
    </button>
  );
};

export default DeleteButton;
