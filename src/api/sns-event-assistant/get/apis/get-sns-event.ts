import { defaultApi } from '@lib/fetcher';

import { BaseResponseDto } from '@common/types/api.common.types';

import { WORKSPACES_SNS_EVENT_ASSISTANT_API_END_POINTS } from '../../api-end-point.constants';
import '../../api.types';
import { GetSnsEventAssistantRequestDto, GetSnsEventAssistantResponseDto } from '../../api.types';

export const GetSnsEvent = async ({ snsEventId }: GetSnsEventAssistantRequestDto) => {
  const response = await defaultApi<BaseResponseDto<GetSnsEventAssistantResponseDto>>(
    WORKSPACES_SNS_EVENT_ASSISTANT_API_END_POINTS.SNS_EVENT_ASSISTANT_DETAIL(snsEventId),
    {
      method: 'GET',
      auth: true,
    },
  );

  return response;
};
