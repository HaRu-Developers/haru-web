import clsx from 'clsx';

/**
 * '다음 단계로' 버튼
 */
const AddQuestionButton = () => {
  return (
    <button
      className={clsx(
        'text-button-1 inline-flex h-[56px] w-[668px] items-center justify-center space-x-[4px] rounded-[12px] bg-gray-600 px-[218px] py-[37px] text-gray-300',
      )}
    >
      <svg width={20} height={20} /> {/* TODO: Add actual SVG icon here */}
      <p>문항 추가하기</p>
    </button>
  );
};

export default AddQuestionButton;
