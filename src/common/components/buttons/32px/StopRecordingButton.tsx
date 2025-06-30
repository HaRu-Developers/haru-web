import clsx from 'clsx';

/**
 * '다음 단계로' 버튼
 */
const StopRecordingButton = () => {
  return (
    <button
      className={clsx(
        'text-caption-1 inline-flex h-[32px] w-[85px] items-center justify-center space-x-[4px] rounded-[100px] bg-gray-600 px-[10px] py-[9px] text-gray-300',
      )}
    >
      <svg width={14} height={14} /> {/* TODO: Add actual SVG icon here */}
      <p>녹음 종료</p>
    </button>
  );
};

export default StopRecordingButton;
