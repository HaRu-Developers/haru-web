import Link from 'next/link';

import { ROUTES } from '@common/constants/routes.constants';

const AlreadyHaveAccountButton = () => {
  return (
    <div className="mt-44pxr flex w-full items-center justify-center">
      <span className="text-b4-rg text-gray-200">이미 계정이 있으신가요?</span>
      <Link
        href={ROUTES.AUTH.LOGIN}
        className="text-t7-sb ml-2 cursor-pointer text-black underline"
      >
        로그인하기
      </Link>
    </div>
  );
};

export default AlreadyHaveAccountButton;
