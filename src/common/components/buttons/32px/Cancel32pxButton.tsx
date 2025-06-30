import clsx from 'clsx';

/**
 * '취소' 버튼. 32px 입니다.
 */
const Cancel32pxButton = () => {
  // whitespace-nowrap
  return (
    <button
      className={clsx(
        'text-button-2 border-inner-w-1-stroke-200 inline-flex h-[32px] w-[48px] items-center justify-center rounded-[6px] bg-white px-[11px] py-[8px] text-black hover:bg-gray-600',
      )}
    >
      취소
    </button>
  );
};

export default Cancel32pxButton;
