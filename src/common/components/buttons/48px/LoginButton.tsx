import clsx from 'clsx';

interface LoginButtonProps {
  isActive: boolean;
  onClick?: () => void;
}

/**
 * '로그인하기' 버튼
 */
const LoginButton = ({ isActive, onClick }: LoginButtonProps) => {
  return (
    <button
      className={clsx(
        'text-button-1 inline-flex h-[48px] w-[414px] items-center justify-center rounded-[9px] px-[152px] py-[17px] text-white',
        isActive ? 'bg-gray-100' : 'bg-gray-500',
      )}
      onClick={onClick}
    >
      로그인하기
    </button>
  );
};

export default LoginButton;
