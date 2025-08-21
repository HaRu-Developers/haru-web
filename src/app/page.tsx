import { redirect } from 'next/navigation';

import { ROUTES } from '@common/constants/routes.constants';

const RootPage = () => {
  redirect(ROUTES.LANDING);
};

export default RootPage;
