import { defaultApi } from '@lib/fetcher';

import { BaseResponseDto } from '@common/types/api.common.types';

import { fetchCalendarResponseDto, fetchCalendarResquestDto } from '../../api.types';
import { WORKSPACE_API_END_POINTS } from '../../api-end-point.constants';

export const fetchCalendar = async ({ workspaceId, start, end }: fetchCalendarResquestDto) => {
  const params = new URLSearchParams();
  params.append('start', start.toISOString().split('T')[0]);
  params.append('end', end.toISOString().split('T')[0]);

  const url = `${WORKSPACE_API_END_POINTS.CALENDAR(workspaceId)}?${params.toString()}`;

  const response = await defaultApi<BaseResponseDto<fetchCalendarResponseDto>>(url, {
    method: 'GET',
    auth: true,
  });

  return response;
};
