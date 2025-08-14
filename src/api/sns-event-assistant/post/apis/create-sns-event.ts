import { defaultApi } from '@lib/fetcher';

import { BaseResponseDto } from '@common/types/api.common.types';

import { WORKSPACES_SNS_EVENT_ASSISTANT_API_END_POINTS } from '../../api-end-point.constants';
import {
  CreateSnsEventAssistantRequestDto,
  CreateSnsEventAssistantResponseDto,
} from '../../api.types';

export const CreateSnsEvent = async ({
  workspaceId,
  title,
  snsEventLink,
  condition,
}: CreateSnsEventAssistantRequestDto) => {
  const response = await defaultApi<BaseResponseDto<CreateSnsEventAssistantResponseDto>>(
    WORKSPACES_SNS_EVENT_ASSISTANT_API_END_POINTS.SNS_EVENT_ASSISTANT_CREATE(workspaceId),
    {
      method: 'POST',
      body: JSON.stringify({
        title,
        snsEventLink,
        condition,
      }),
      auth: true,
    },
  );

  return response;
};
