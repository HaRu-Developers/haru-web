import clsx from 'clsx';

interface RegisterButtonProps {
  isActive: boolean;
}

/**
 * '회원가입하기' 버튼
 */
const RegisterButton = ({ isActive }: RegisterButtonProps) => {
  return (
    <button
      className={clsx(
        'text-button-1 inline-flex h-[48px] w-[414px] items-center justify-center rounded-[9px] px-[152px] py-[17px] text-white',
        isActive ? 'bg-gray-100' : 'bg-gray-500',
      )}
    >
      회원가입하기
    </button>
  );
};

export default RegisterButton;
