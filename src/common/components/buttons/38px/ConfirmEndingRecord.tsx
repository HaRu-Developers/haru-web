import clsx from 'clsx';

interface ConfirmRecordEndingProps {
  isEndingRecord: boolean;
}

/**
 * '네. AI 회의록 작성으로 넘어갈래요. / 아니요. 이어서 녹음할래요.' 버튼
 */
const ConfirmEndingRecord = ({ isEndingRecord: isProceeding }: ConfirmRecordEndingProps) => {
  return (
    <button
      className={clsx(
        'text-button-1 border-inner-w-1-stroke-200 inline-flex h-[38px] w-[300px] items-center justify-center rounded-[7px] bg-white px-[16px] py-[12px] hover:bg-gray-600',
        isProceeding ? 'text-primary' : 'text-gray-100',
      )}
    >
      {isProceeding ? '네. AI 회의록 작성으로 넘어갈래요.' : '아니요. 이어서 녹음할래요.'}
    </button>
  );
};

export default ConfirmEndingRecord;
