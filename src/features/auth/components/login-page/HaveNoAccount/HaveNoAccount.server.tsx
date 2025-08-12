import Link from 'next/link';

import { ROUTES } from '@common/constants/routes.constants';

const HaveNoAccount = () => {
  return (
    <div className="mt-44pxr flex w-full items-center justify-center">
      <span className="text-b4-rg text-gray-200">계정이 없으신가요?</span>
      <Link
        href={ROUTES.AUTH.REGISTER}
        className="text-t7-sb ml-2 cursor-pointer text-black underline"
      >
        가입하기
      </Link>
    </div>
  );
};

export default HaveNoAccount;
