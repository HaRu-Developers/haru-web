interface WriteCompleteButtonProps {
  onClick?: () => void;
}

/**
 * '작성 완료' 버튼
 */
const WriteCompleteButton = ({ onClick }: WriteCompleteButtonProps) => {
  return (
    <button
      className="text-button-3 inline-flex h-[30px] w-[76px] items-center justify-center rounded-[100px] bg-gray-100 px-[12px] py-[6px] text-white"
      onClick={onClick}
    >
      작성 완료
    </button>
  );
};

export default WriteCompleteButton;
