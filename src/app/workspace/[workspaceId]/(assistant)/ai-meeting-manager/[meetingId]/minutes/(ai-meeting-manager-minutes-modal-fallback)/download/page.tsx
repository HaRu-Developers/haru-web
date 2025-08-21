import { SearchParamsType } from '@common/types/routes.types';

import DownloadMeetingMinutesModalPage from '../../@aiMeetingManagerMinutesModal/(.)download/page';
import AiMeetingMinutesPage from '../../page';

const DownloadStandalonePage = async ({
  searchParams,
}: {
  searchParams: Promise<SearchParamsType>;
}) => {
  return (
    <>
      <DownloadMeetingMinutesModalPage />
      <AiMeetingMinutesPage searchParams={searchParams} />
    </>
  );
};

export default DownloadStandalonePage;
