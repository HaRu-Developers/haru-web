import { defaultApi } from '@lib/fetcher';

import { BaseResponseDto } from '@common/types/api.common.types';

import { WORKSPACES_SNS_EVENT_ASSISTANT_API_END_POINTS } from '../../api-end-point.constants';
import { UpdateSnsEventAssistantRequestDto } from '../../api.types';

export const UpdateSnsEvent = async ({ snsEventId, title }: UpdateSnsEventAssistantRequestDto) => {
  const response = await defaultApi<BaseResponseDto<unknown>>(
    WORKSPACES_SNS_EVENT_ASSISTANT_API_END_POINTS.SNS_EVENT_ASSISTANT_EDIT(snsEventId),
    {
      method: 'PATCH',
      body: JSON.stringify({ title }),
      auth: true,
    },
  );

  return response;
};
