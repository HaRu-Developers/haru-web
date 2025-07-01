import clsx from 'clsx';

import DownloadIcon from '@common/svgs/individual/DownloadIcon.svg';

interface DownloadButtonProps {
  onClick?: () => void;
}

/**
 * '다음 단계로' 버튼
 */
const DownloadButton = ({ onClick }: DownloadButtonProps) => {
  return (
    <button
      className={clsx(
        'text-button-3 inline-flex h-[30px] w-[96px] items-center justify-center space-x-[4px] rounded-[100px] bg-gray-100 py-[6px] pr-[14px] pl-[12px] text-white',
      )}
      onClick={onClick}
    >
      <DownloadIcon width={18} height={18} stroke="white" />
      <p>다운로드</p>
    </button>
  );
};

export default DownloadButton;
