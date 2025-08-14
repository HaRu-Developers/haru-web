import { defaultApi } from '@lib/fetcher';

import { BaseResponseDto } from '@common/types/api.common.types';

import { WORKSPACES_SNS_EVENT_ASSISTANT_API_END_POINTS } from '../../api-end-point.constants';
import { DeleteSnsEventAssistantRequestDto } from '../../api.types';

export const DeleteSnsEvent = async ({ snsEventId }: DeleteSnsEventAssistantRequestDto) => {
  const response = await defaultApi<BaseResponseDto<unknown>>(
    WORKSPACES_SNS_EVENT_ASSISTANT_API_END_POINTS.SNS_EVENT_ASSISTANT_DELETE(snsEventId),
    {
      method: 'DELETE',
      auth: true,
    },
  );

  return response;
};
