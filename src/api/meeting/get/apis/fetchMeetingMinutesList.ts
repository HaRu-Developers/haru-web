import { defaultApi } from '@lib/fetcher';

import { BaseResponseDto } from '@common/types/api.common.types';

import { MEETING_API_ENDPOINTS } from '../../api-end-point.constants';
import { MeetingMinutesListResponseDto, WorkspaceIdRequestDto } from '../../api.types';

const fetchMeetingMinutesList = async ({ workspaceId }: WorkspaceIdRequestDto) => {
  const response = await defaultApi<BaseResponseDto<MeetingMinutesListResponseDto>>(
    MEETING_API_ENDPOINTS.MEETING_MINUTES_LIST(workspaceId),
    {
      method: 'GET',
      auth: true,
    },
  );

  return response;
};

export default fetchMeetingMinutesList;
