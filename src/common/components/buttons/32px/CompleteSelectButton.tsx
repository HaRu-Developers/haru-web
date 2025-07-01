import clsx from 'clsx';

/** 추후 경운님 방식으로 타입 파일 관리 하겠습니다. */
interface CompleteSelectButtonProps {
  onClick: () => void;
}

/**
 * '선택 완료' 버튼.
 */

const CompleteSelectButton = ({ onClick }: CompleteSelectButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        'text-button-2 bg-primary inline-flex h-[32px] w-[75px] items-center justify-center rounded-[6px] px-[12px] py-[8px] text-white',
      )}
    >
      선택 완료
    </button>
  );
};

export default CompleteSelectButton;
