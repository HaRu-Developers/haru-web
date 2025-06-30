import clsx from 'clsx';

/**
 * '선택 완료' 버튼.
 */
const CompleteSelectButton = () => {
  return (
    <button
      className={clsx(
        'text-button-2 bg-primary inline-flex h-[32px] w-[75px] items-center justify-center rounded-[6px] px-[12px] py-[8px] text-white',
      )}
    >
      선택 완료
    </button>
  );
};

export default CompleteSelectButton;
