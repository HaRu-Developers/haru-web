import { defaultApi } from '@lib/fetcher';

import { BaseResponseDto } from '@common/types/api.common.types';

import { WORKSPACES_SNS_EVENT_ASSISTANT_API_END_POINTS } from '../../api-end-point.constants';
import {
  GetSnsEventAssistantListRequestDto,
  GetSnsEventAssistantListResponseDto,
} from '../../api.types';

export const GetSnsEventList = async ({ workspaceId }: GetSnsEventAssistantListRequestDto) => {
  const response = await defaultApi<BaseResponseDto<GetSnsEventAssistantListResponseDto>>(
    WORKSPACES_SNS_EVENT_ASSISTANT_API_END_POINTS.SNS_EVENT_ASSISTANT_LIST_DETAIL(workspaceId),
    {
      method: 'GET',
      auth: true,
    },
  );

  return response;
};
