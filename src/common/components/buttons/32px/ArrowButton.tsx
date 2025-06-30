import clsx from 'clsx';

interface ArrowButtonProps {
  direction: 'LEFT' | 'RIGHT';
}

/**
 * '화살표' 버튼
 */
const ArrowButton = ({ direction }: ArrowButtonProps) => {
  return (
    <button
      className={clsx(
        'border-inner-w-1-stroke-200 inline-flex h-[32px] w-[32px] items-center justify-center rounded-[6px] bg-white px-[6px] py-[8px] hover:bg-gray-600',
      )}
    >
      {direction == 'LEFT' ? <svg width={20} height={20} /> : <svg width={20} height={20} />}
      {/* TODO: Add actual SVG icon here */}
    </button>
  );
};

export default ArrowButton;
