import clsx from 'clsx';

/**
 * '취소하기' 버튼. 38px 입니다.
 */
const Cancel38pxButton = () => {
  return (
    <button
      className={clsx(
        'text-button-1 border-inner-w-1-stroke-200 inline-flex h-[38px] w-[128px] items-center justify-center rounded-[7px] bg-white px-[16px] py-[12px] text-gray-100 hover:bg-gray-600',
      )}
    >
      취소하기
    </button>
  );
};

export default Cancel38pxButton;
