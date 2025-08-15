import { defaultApi } from '@lib/fetcher';

import {
  TeamMoodReportDownloadLinkRequestDto,
  TeamMoodReportDownloadLinkResponseDto,
} from '@api/team-mood-tracker/apis.types';
import { MOOD_TRACKER_API_ENDPOINTS } from '@api/team-mood-tracker/end-point.constants';

import { BaseResponseDto } from '@common/types/api.common.types';

export const downloadReport = async ({
  moodTrackerHashedId,
  format,
}: TeamMoodReportDownloadLinkRequestDto) => {
  const params = new URLSearchParams({ format });
  const query = params.toString();

  const response = await defaultApi<BaseResponseDto<TeamMoodReportDownloadLinkResponseDto>>(
    `${MOOD_TRACKER_API_ENDPOINTS.DOWNLOAD_LINK(moodTrackerHashedId)}?${query}`,
    {
      method: 'GET',
      auth: true,
    },
  );

  return response.result;
};
